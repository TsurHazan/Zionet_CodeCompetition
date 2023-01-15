import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bgMode } from "../../../bgModeContext";
import {
  getCategories,
  getCompetitionTask,
  getUserCompetitionManagement,
  updateCompetitionManagement,
} from "../../../Middlewares/competitions/competitions.js";

export const EditCompetition = () => {
  let { id } = useParams();
  const { user } = useAuth0();
  const { bgState } = useContext(bgMode);

  const [competition, setCompetition] = useState({
    Start: "",
    Name: "new Competition",
    End: "",
    Numberofteams: "0",
    hashcode: "noHash",
    maxActiveTasks: "0",
  });
  // const [allTask, setAllTask] = useState({});
  // const [allCategories, setCategories] = useState({});

  const handleChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    setCompetition((values) => ({ ...values, [name]: value }));
  };

  // // <---------- Get All Task For This Copmetition -------------->
  // const getAllCompetitionTask = async () => {
  //   const all = await getCompetitionTask(user.sub, id);
  //   const data = Object.values(all.data);
  //   setAllTask(data);
  // };
  // // <---------- Get All Categories -------------->
  // const getallCategories = async () => {
  //   const all = await getCategories();
  //   const data = Object.values(all.data);
  //   setAllTask(data);
  // };
  // <---------- Get And Set All Competition Data -------------->
  const getAllCompetitionDetailsFromDB = async () => {
    const dat = await getUserCompetitionManagement(user.sub, id);
    const ans = dat.data;
    const myObj = {
      id: ans.id,
      Start: ans.start,
      Name: ans.name,
      End: ans.end,
      Numberofteams: ans.numOfTeams,
      status: ans.status,
      hashcode: ans.hashcode,
      maxActiveTasks: ans.maxActiveTasks,
    };
    console.log(myObj);
    setCompetition(myObj);
  };
  // <---------- Send Update Competition To DB -------------->
  const handleUpdateCompetition = async () => {
    competition.maxActiveTasks = parseInt(competition.maxActiveTasks);
    console.log(competition);
    const bla = JSON.stringify(competition);
    await updateCompetitionManagement(user.sub, bla);
  };

  // <---------- Get All Data From DB BY useEffect-------------->
  useEffect(() => {
    const initUseEffect = async () => {
      await getAllCompetitionDetailsFromDB();
      // await getAllCompetitionTask();
      // await getallCategories();
    };
    initUseEffect();
  }, []);
  return (
    <div className="competitionEdit">
      <label htmlFor="Name">
        Name
        <br />
        <input
          type="text"
          id="Name"
          value={competition.Name}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="Start">
        Start
        <br />
        <input
          type="datetime-local"
          id="Start"
          defaultValue={competition.Start}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="End">
        End <br />
        <input
          type="datetime-local"
          id="End"
          defaultValue={competition.End}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="hashcode">
        Hash Code
        <br />
        <input
          type="text"
          id="hashcode"
          value={competition.hashcode}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="maxActiveTasks">
        Max Active Tasks
        <br />
        <input
          type="number"
          id="maxActiveTasks"
          value={competition.maxActiveTasks}
          onChange={handleChange}
        />
      </label>

      <button onClick={handleUpdateCompetition}>Update</button>
    </div>
  );
};
