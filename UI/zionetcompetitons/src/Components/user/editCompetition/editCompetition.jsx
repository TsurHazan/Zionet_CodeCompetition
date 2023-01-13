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

  const [competition, setCompetition] = useState({
    Start: "",
    Name: "new Competition",
    End: "",
    Numberofteams: "0",
    hashcode: "noHash",
    maxActiveTasks: "0",
  });
  const [allTask, setAllTask] = useState({});
  const [allCategories, setCategories] = useState({});

  const handleChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    setCompetition((values) => ({ ...values, [name]: value }));
    // HandleDate();
  };

  const HandleDate = async () => {
    setCompetition((values) => ({
      ...values,
      End: values.End.replace("T", " "),
      Start: values.Start.replace("T", " "),
    }));
    console.log(competition);
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
    const dat = await getUserCompetitionManagement(user.sub, id);
    const ans = dat.data;
    console.log(ans);
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
    //const rows = Object.keys(ans).map((c) => ans[c]);
    setCompetition(myObj);
    //await HandleDate();
  };
  const handleUpdateCompetition = async () => {
    competition.maxActiveTasks = parseInt(competition.maxActiveTasks);

    // competition.End = competition.End.toISOString().substring(0, 16);
    // competition.Start = competition.Start.toISOString().substring(0, 16);
    console.log(competition);
    const bla = JSON.stringify(competition);
    console.log(bla);
    await updateCompetitionManagement(user.sub, bla);
  };

  useEffect(() => {
    const initUseEffect = async () => {
      await getAllCompetitionDetailsFromDB();
      await getAllCompetitionTask();
      await getallCategories();
    };
    initUseEffect();
  }, []);
  //console.log(competition);
  //<input type="text" id="status" value={competition.status} />
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
