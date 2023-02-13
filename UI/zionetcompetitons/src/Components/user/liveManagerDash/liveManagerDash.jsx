import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  getCompetitionTask,
  getSubmittedTask,
  getUserCompetitionManagement,
  updateStatusCompetition,
} from "../../../Middlewares/competitions/competitions";
import { GetAllTeamsInCompetition } from "../../../Middlewares/teams/teams";
import { submitTaskSucceeded } from "../../../Pages/editCompetition/taskContext";
import { PopSubmittesTask } from "../popSubmittesTask/popSubmittesTask";
import { TeamsScoreComponent } from "../teamsScoreComponent/teamsScoreComponent";

export const LiveManagerDash = () => {
  const { id } = useParams();
  const { user } = useAuth0();
  const [competition, setCompetition] = useState({});
  const [teamsInfo, setTeamsInfo] = useState([]);
  const [timeLeft, setTimeLeft] = useState("");
  const [taskSubmitted, setTaskSubmitted] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [enterPoint, setenterPoint] = useState({});
  const [submitTaskSuccess, setSubmitTaskSuccess] =
    useRecoilState(submitTaskSucceeded);

  const EndCopmetition = async () => {
    await updateStatusCompetition(user.sub, id, "Finished");
    window.location.href = "/Management";
  };

  const HandleDate = () => {
    setCompetition((values) => ({
      ...values,
      end: values.end.replace("T", " "),
      start: values.start.replace("T", " "),
    }));
  };
  const getAllCompetitionDetailsFromDB = async () => {
    const ans = await getUserCompetitionManagement(user.sub, id);
    setCompetition(ans.data);
    let nowDate = new Date();
    let newDate = new Date(ans.data.end);
    let ddd = new Date(newDate - nowDate);

    setTimeLeft(ddd.toTimeString().substring(0, 8));

    HandleDate();
  };
  const getCompettitionTeams = async () => {
    const allteam = await GetAllTeamsInCompetition(user.sub, id);
    const data = Object.values(allteam.data);
    setTeamsInfo(data);
  };
  const getAllCompettitionsTask = async () => {
    const allteam = await getCompetitionTask(user.sub, id);
    const data = Object.values(allteam.data);
    setAllTasks(data);
  };
  const getAllSubmittedTask = async () => {
    const allTask = await getSubmittedTask(user.sub, id);
    const data = Object.values(allTask.data);
    setTaskSubmitted(data);
  };
  useEffect(() => {
    const initUseEffect = async () => {
      await getAllCompetitionDetailsFromDB();
      await getCompettitionTeams();
      await getAllCompettitionsTask();
      await getAllSubmittedTask();
    };
    initUseEffect();
  }, [submitTaskSuccess]);
  //enterPoint TO useEffect ??

  return (
    <div className="liveManagerDash">
      <h4>Live Manager DASH</h4>
      <h2>{competition.name}</h2>
      <p>Status: {competition.status}</p>
      <p>Hash Code is: {competition.hashcode}</p>
      <p>Time Left: {timeLeft}</p>
      <TeamsScoreComponent />

      {/* Map task Submitted */}
      {/* Map team info to get Team Name for task  */}
      {taskSubmitted.map((task) => {
        let teamObj = teamsInfo.find((oneTeam) => {
          return oneTeam.id === task.teamID;
        });
        let originalTask = allTasks.find((oneTask) => {
          return oneTask.id === task.taskID;
        });
        return (
          <span key={task.id}>
            <p>{teamObj.Name}</p>
            <p>Task: {originalTask.name}</p>
            <PopSubmittesTask
              originalTask={originalTask}
              submittedTask={task}
            ></PopSubmittesTask>
          </span>
        );
      })}
      <div>
        <button onClick={EndCopmetition}>Finish</button>
      </div>
    </div>
  );
};
