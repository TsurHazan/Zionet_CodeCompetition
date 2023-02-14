import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect, useContext } from "react";
import { GetSolveTaskTabInformation } from "../../../Middlewares/tasks/tasks";
import { useParams } from "react-router-dom";

export const TaskTabComponent = () => {
  const { user } = useAuth0();
  const [taskState, setTaskState] = useState([]);
  const [activeTaskState, setActiveTaskState] = useState([]);
  const [TeamMembers, setTeamMembers] = useState([]);
  const { activeTaskID, competitionID, teamID } = useParams();
  const [timeLeft, setTimeLeft] = useState([]);
  const [timeLeftClass, setTimeLeftClass] = useState("text-primary");

  const getSolveTaskInformation = async () => {
    const solveActiveTask = await GetSolveTaskTabInformation(
      user.sub,
      competitionID,
      teamID,
      activeTaskID
    );
    if (solveActiveTask.status === 200) {
      setTaskState(solveActiveTask.data.task);
      setActiveTaskState(solveActiveTask.data.activeTask);
      setTeamMembers(solveActiveTask.data.teamMembers);

      let nowDate = new Date();
      let competitionDate = new Date(solveActiveTask.data.activeTask.endTime);
      const timeDiff = competitionDate - nowDate;
      const seconds = Math.floor(timeDiff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);

      const timeLeft = {
        hours: hours,
        minutes: minutes % 60,
        seconds: seconds % 60,
      };
      if (timeLeft.hours <= 0) {
        setTimeLeft(`${timeLeft.minutes}:${timeLeft.seconds}`);
        if (timeLeft.minutes <= 5) {
          //Last 5 minutes
          if (timeLeft.minutes <= 0 && timeLeft.seconds <= 0) {
            setTimeLeft("TIME OVER, HURRY UP!");
            setTimeLeftClass("text-danger");
          }
        }
      } else {
        setTimeLeft(
          `${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`
        );
      }
    }
  };

  useEffect(() => {
    const getTabInfo = async () => {
      await getSolveTaskInformation();
    };
    getTabInfo();
  }, []);

  return (
    <div className="dashboard">
      <div className="flex-container-columnn">
        <div className="dashboard-opening-information">
          <h1>Task: {taskState.name}</h1>
          <div>
            <h6>Good Luck!</h6>
            <div className={timeLeftClass}>Time left : {timeLeft}</div>
          </div>
        </div>

        <div className="">
          <h4 className="text-primary">Task Info</h4>
          <div className="component-container">
            <div className="solveTask-task-grid-container">
              <div className="solveTask-grid-item ">
                Points: {taskState.points}
              </div>
              <div className="solveTask-grid-item ">
                Bonus Time: {taskState.BonusTime}
              </div>
              <div className="solveTask-grid-item">
                Bonus Points: {taskState.BonusPoints}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-primary">Description</h4>
          <div className="component-container">
            <div className="solveTask-description">{taskState.Description}</div>
          </div>
        </div>

        <div>
          <h4 className="text-primary">Submit</h4>
          <div className="component-container">
            <div className="solveTask-Submit">Submit:</div>
          </div>
        </div>
      </div>
    </div>
  );
};
