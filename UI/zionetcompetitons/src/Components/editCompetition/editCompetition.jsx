import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import { Col, InputGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { bgMode } from "../../bgModeContext";
import {
  getCompetitionTask,
  getUserCompetitionManagement,
} from "../../Middlewares/competitions.js/competitions";

export const EditCompetition = () => {
  let { id } = useParams();
  const { user } = useAuth0();
  const { bgState } = useContext(bgMode);

  const [competition, setCompetition] = useState({});
  const [allTask, setAllTask] = useState({});

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
  const getAllCompetitionDetailsFromDB = async () => {
    const ans = await getUserCompetitionManagement(user.sub, id);
    console.log(ans);
    // const data = Object.values(ans.data);
    // console.log(data);
    setCompetition(ans.data);
    HandleDate();
  };
  useEffect(async () => {
    await getAllCompetitionDetailsFromDB();
    await getAllCompetitionTask();
  }, []);

  /*
  const [inputs, setInputs] = useState({
    Start: this.toISOString().substring(0, 16),
    Name: "new Competition",
    End: this.toISOString().substring(0, 16),
    Numberofteams: "3",
    hashcode: "noHash",
    maxactivetasks: "3",
  });
  */

  console.log(competition);

  return (
    <div className="allcompetitionPage">
      <div className="competitionEdit">
        <label htmlFor="name">Name </label>
        <input type="text" id="name" defaultValue={competition.name} />

        <label htmlFor="status">Status </label>
        <input type="text" id="status" value={competition.status} />

        <>
          <label htmlFor="numOfTeams">Teams number </label>
          <input type="text" id="numOfTeams" value={competition.numOfTeams} />
        </>
        <>
          <label htmlFor="start">Start </label>
          <input
            type="datetime-local"
            id="start"
            defaultValue={competition.start}
          />
        </>
        <>
          <label htmlFor="end">End </label>
          <input
            type="datetime-local"
            id="end"
            defaultValue={competition.end}
          />
        </>
        <>
          <label htmlFor="hashcode">Hash Code </label>
          <input
            type="text"
            id="hashcode"
            defaultValue={competition.hashcode}
          />
        </>
        <>
          <label htmlFor="maxActiveTasks">Max Active Tasks </label>
          <input
            type="number"
            id="maxActiveTasks"
            defaultValue={competition.maxActiveTasks}
          />
        </>
      </div>
    </div>
  );
};
