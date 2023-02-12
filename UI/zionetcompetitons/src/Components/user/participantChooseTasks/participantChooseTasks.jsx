import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  GetAvailableTasks,
  ChooseTask,
} from "../../../Middlewares/tasks/tasks";

export const ParticipantChooseTasks = ({ competitionID, teamID }) => {
  const { user } = useAuth0();
  const [availableTasks, setAvailableTasks] = useState([]);

  useEffect(() => {
    const fetchAvailableTasks = async () => {
      const tasks = await GetAvailableTasks(user.sub, competitionID, teamID);
      const tasksArray = Object.values(tasks.data);
      setAvailableTasks(tasksArray);
      console.log(tasksArray);
    };
    fetchAvailableTasks();
  }, []);

  const participantChooseTask = async (taskID, timeframe) => {
    const isChoosed = await ChooseTask(
      user.sub,
      competitionID,
      teamID,
      taskID,
      timeframe
    );

    console.log(taskID, timeframe);
    console.log(isChoosed.data);
  };

  return (
    <div className="chooseTask-table">
      <div className="singleTask-table">
        <div className="singleTask-column headerTask">Category</div>
        <div className="singleTask-column headerTask">Name</div>
        <div className="singleTask-column headerTask">Points</div>
        <div className="singleTask-column headerTask">Time</div>
        <div className="singleTask-column headerTask">Bonus Points</div>
        <div className="singleTask-column headerTask">Bonus Time</div>
        <div className="singleTask-column headerTask"></div>
      </div>
      {availableTasks.map((t) => {
        return (
          <div key={t.id} className="singleTask-table">
            <div className="singleTask-column">{t.CategoryID}</div>
            <div className="singleTask-column">{t.name}</div>
            <div className="singleTask-column">{t.points}</div>
            <div className="singleTask-column">{t.Timeframe}</div>
            <div className="singleTask-column">{t.BonusPoints}</div>
            <div className="singleTask-column">{t.BonusTime}</div>
            <div className="singleTask-column">
              <button
                onClick={async () => {
                  await participantChooseTask(t.id, t.Timeframe);
                }}
              >
                Choose Task
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
