import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { bgMode } from "../../../bgModeContext";
import {
  getCategories,
  getCompetitionTask,
  getUserCompetitionManagement,
  updateCompetitionManagement,
} from "../../../Middlewares/competitions.js/competitions";

export const EditCompetition = () => {
  let { id } = useParams();
  const { user } = useAuth0();
  const { bgState } = useContext(bgMode);

  const [competition, setCompetition] = useState({});
  const [allTask, setAllTask] = useState({});
  const [allCategories, setCategories] = useState({});

  const handleChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    setCompetition((values) => ({ ...values, [name]: value }));
    HandleDate();
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
    const data = Object.values(all.data);
    setAllTask(data);
  };
  const getallCategories = async () => {
    const all = await getCategories();
    const data = Object.values(all.data);
    setAllTask(data);
  };
  const getAllCompetitionDetailsFromDB = async () => {
    const ans = await getUserCompetitionManagement(user.sub, id);
    console.log(ans.data);
    setCompetition(ans.data);
    HandleDate();
  };
  const handleUpdateCompetition = async () => {
    competition.maxActiveTasks = parseInt(competition.maxActiveTasks);
    console.log(competition);

    await updateCompetitionManagement(user.sub, competition);
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
    <div className="competitionEdit">
      <label htmlFor="Name">
        Name
        <br />
        <input
          type="text"
          id="Name"
          defaultValue={competition.name}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="Start">
        Start
        <br />
        <input
          type="datetime-local"
          id="Start"
          defaultValue={competition.start}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="End">
        End <br />
        <input
          type="datetime-local"
          id="End"
          defaultValue={competition.end}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="hashcode">
        Hash Code
        <br />
        <input
          type="text"
          id="hashcode"
          defaultValue={competition.hashcode}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="maxActiveTasks">
        Max Active Tasks
        <br />
        <input
          type="number"
          id="maxActiveTasks"
          defaultValue={competition.maxActiveTasks}
          onChange={handleChange}
        />
      </label>

      <button onClick={handleUpdateCompetition}>Update</button>
    </div>
  );
};
