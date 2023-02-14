import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect, useContext } from "react";
import {
  GetSolveTaskTabInformation,
  SubmitSolvedTask,
} from "../../../Middlewares/tasks/tasks";
import { useParams } from "react-router-dom";

export const TaskTabComponent = () => {
  const { user } = useAuth0();
  const [taskState, setTaskState] = useState([]);
  const [activeTaskState, setActiveTaskState] = useState([]);
  const [TeamMembers, setTeamMembers] = useState([]);
  const { activeTaskID, competitionID, teamID } = useParams();
  const [timeLeft, setTimeLeft] = useState([]);
  const [timeLeftClass, setTimeLeftClass] = useState("text-primary");
  const [checkedItems, setCheckedItems] = useState([]);
  const [managersInfo, setManagersInfo] = useState([]);
  const [confirmationCheck, setConfirmationCheck] = useState(false);
  const [confirmationCheck2, setConfirmationCheck2] = useState(false);
  const [bonusStatus, setBonusesStatus] = useState(false);
  const isButtonVisible = confirmationCheck && confirmationCheck2;

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
      setTeamMembers(Object.values(solveActiveTask.data.teamMembers));
      setManagersInfo(
        Object.values(solveActiveTask.data.competitionManagersInfo)
      );

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

  const handleInputChange = (event) => {
    const index = checkedItems.indexOf(event.target.name);
    if (event.target.checked && index === -1) {
      setCheckedItems([...checkedItems, event.target.name]);
    } else if (!event.target.checked && index !== -1) {
      setCheckedItems(
        checkedItems.filter((name) => name !== event.target.name)
      );
    }
  };

  const handleSubmitRepo = (event) => {
    activeTaskState.gitRepo = event.target.value;
  };

  const handleSubmitTask = async () => {
    const result = TeamMembers.filter((obj) =>
      checkedItems.includes(obj.email)
    );

    let mapped = result.map((item) => ({ [item.email]: item }));
    const newObj = Object.assign({}, ...mapped);

    const SolveActiveTask = {
      task: taskState,
      activeTask: activeTaskState,
      teamMembers: newObj,
      competitionManagersInfo: {},
    };

    const ans = await SubmitSolvedTask(
      user.sub,
      competitionID,
      teamID,
      activeTaskID,
      SolveActiveTask
    );

    if (ans.status === 200) {
      window.location.href = "http://localhost:3000/Participate";
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
            <div className={timeLeftClass}>Time left : {timeLeft}</div>
          </div>
        </div>

        <div className="solveTask-section-container">
          <div className="solveTask-container-header">Task Info:</div>
          <div className="solveTask-taskInfo-grid-container component-container ">
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
            <div>
              <div className="solveTask-container-header">Description:</div>
              <div className="solveTask-description">
                {taskState.Description}
              </div>
            </div>
          </div>
        </div>

        <div className="solveTask-section-container">
          <div className="solveTask-container-header">Submit:</div>
          <div className="component-container solveTask-Submit-container">
            <div className="solveTask-select-members-container">
              Who Worked on this task?:
              {TeamMembers.map((m) => {
                return (
                  <div key={m.id} className="solveTask-memberLabel-container">
                    <label>
                      <input
                        type="checkbox"
                        name={m.email}
                        checked={checkedItems.includes(m.email)}
                        onChange={handleInputChange}
                      />
                      {m.name}
                    </label>
                  </div>
                );
              })}
              <div>
                <input
                  type="url"
                  defaultValue={"Enter Repository link"}
                  onChange={handleSubmitRepo}
                />
              </div>
              <div>
                Have you completed the bonus tasks?
                <div className="solveTask-memberLabel-container">
                  <label>
                    <input
                      type="checkbox"
                      name={bonusStatus}
                      checked={bonusStatus}
                      onChange={(event) =>
                        setBonusesStatus(event.target.checked)
                      }
                    />
                    {bonusStatus.toString()}
                  </label>
                </div>
              </div>
              {isButtonVisible && (
                <div className="solveTask-submit-button-container">
                  <button
                    className="btn btn-success"
                    onClick={handleSubmitTask}
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
            <div className="text-danger">
              <div className="text-danger">- IMPORTANT -</div>
              <div>
                1.BE SURE YOU ADDED THE JUDGEMENT TEAM TO THE PRIVATE GIT
                REPOSITORY!
              </div>
              <div className="text-warning">
                Judgement team:
                {managersInfo.map((m) => {
                  return (
                    <div key={m.email}>
                      {m.name} - {m.email}
                    </div>
                  );
                })}
              </div>
              <div className="text-danger">
                2.The GitHub task must have a README file describing the task,
                how it was solved and if there are open issues
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name={"I Added the Judgement team to my private repository"}
                    checked={confirmationCheck2}
                    onChange={(event) =>
                      setConfirmationCheck2(event.target.checked)
                    }
                  />
                  I Added the Judgement team to my private repository
                </label>

                <label>
                  <input
                    type="checkbox"
                    name={"I Created a README file and its in my repository"}
                    checked={confirmationCheck}
                    onChange={(event) =>
                      setConfirmationCheck(event.target.checked)
                    }
                  />
                  I Created a README file and its in my repository
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
