import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bgMode } from "../../../bgModeContext";
import {
  getCategories,
  getCompetitionTask,
  getUserCompetitionManagement,
} from "../../../Middlewares/competitions/competitions.js";

export const EditCompetition = () => {
  let { id } = useParams();
  const { user } = useAuth0();
  const { bgState } = useContext(bgMode);

  const [competition, setCompetition] = useState({});
  const [allTask, setAllTask] = useState({});
  const [allCategories, setCategories] = useState({});

  /*
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setCompetition((values) => ({ ...values, [name]: value }));
  };
  */
  const ChangcompetitionValue = (colum, val) => {
    setCompetition((values) => ({ ...values, [colum]: val }));
    HandleDate();
  };

  const handleStatusChange = (event) => {
    const updated = competition;
    updated.status = event.target.value;
    setCompetition(updated);
  };
  const HandleDate = () => {
    setCompetition((values) => ({
      ...values,
      end: values.end.replace("T", " "),
      start: values.start.replace("T", " "),
    }));
  };

  const getAllCompetitionTask = async () => {
    const all = await getCompetitionTask(user.sub, id);
    console.log(all);
    const data = Object.values(all.data);
    console.log(data);
    //setAllTask(data);
  };
  const getallCategories = async () => {
    const all = await getCategories();
    console.log(all);
    const data = Object.values(all.data);
    console.log(data);
    //setAllTask(data);
  };
  const getAllCompetitionDetailsFromDB = async () => {
    const ans = await getUserCompetitionManagement(user.sub, id);
    console.log(ans);
    // const data = Object.values(ans.data);
    // console.log(data);
    setCompetition(ans.data);
    HandleDate();
  };
  useEffect(() => {
    const initUseEffect = async () => {
      await getAllCompetitionDetailsFromDB();
      await getAllCompetitionTask();
      await getallCategories();
    };
    initUseEffect();
  }, []);

  //<input type="text" id="status" value={competition.status} />
  return (
    <>
      <div className="competitionEdit">
        <label htmlFor="name">
          Name
          <br />
          <input type="text" id="name" defaultValue={competition.name} />
        </label>

        <label htmlFor="status">
          Status
          <br />
          <select
            defaultValue={competition.status}
            onChange={handleStatusChange}
          >
            <option value="Running">Running</option>
            <option value="Finished">Finished</option>
            <option value="In Preparation">In Preparation</option>
          </select>
        </label>

        <label htmlFor="start">
          Start
          <br />
          <input
            type="datetime-local"
            id="start"
            defaultValue={competition.start}
          />
        </label>

        <label htmlFor="end">
          End <br />
          <input
            type="datetime-local"
            id="end"
            defaultValue={competition.end}
          />
        </label>

        <label htmlFor="hashcode">
          Hash Code
          <br />
          <input
            type="text"
            id="hashcode"
            defaultValue={competition.hashcode}
          />
        </label>

        <label htmlFor="maxActiveTasks">
          Max Active Tasks
          <br />
          <input
            type="number"
            id="maxActiveTasks"
            defaultValue={competition.maxActiveTasks}
          />
        </label>
      </div>
    </>
  );
};
