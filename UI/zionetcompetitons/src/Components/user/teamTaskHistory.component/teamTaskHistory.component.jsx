import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { GetTaskHistory } from "../../../Middlewares/tasks/tasks";

export const TeamTaskHistoryComponent = ({ competitionID, teamID }) => {
  const { user } = useAuth0();
  const [tasks, setTasks] = useState([]);

  const getTaskHistory = async () => {
    const tasks = await GetTaskHistory(user.sub, competitionID, teamID);
    if (tasks.status === 200) {
      setTasks(Object.values(tasks.data));
    }
  };
  const linkedTask = (t) => {
    if (t.Status === "In Progress") {
      const linkedTask = (
        <div className="singleTask-column">
          <button
            className="btn btn-primary"
            onClick={() => {
              window.open(
                `/LiveCompetitionDashboard/SolveActiveTask/${t.id}/${competitionID}/${teamID}`,
                "_blank",
                "noreferrer"
              );
            }}
          >
            {t.Status}
          </button>
        </div>
      );
      return linkedTask;
    }
  };

  const handleSubmittedTime = (t) => {
    if (t === "1990-01-01T00:00:00") return "Not Submitted";
  };

  const HandleDate = (t) => {
    t((values) => ({
      ...values,
      end: values.end.replace("T", " "),
      start: values.start.replace("T", " "),
    }));
  };

  useEffect(() => {
    getTaskHistory();
  }, []);

  return (
    <div className="Task-table">
      <div className="singleTask-table">
        <div className="singleTask-column headerTask">Start time</div>
        <div className="singleTask-column headerTask">End time</div>
        <div className="singleTask-column headerTask">Submitted time</div>
        <div className="singleTask-column headerTask">Status</div>
        <div className="singleTask-column headerTask"></div>
      </div>
      {tasks.map((t) => {
        return (
          <div key={t.id} className="singleTask-table">
            <div className="singleTask-column">
              {t.startTime.replace("T", " ")}
            </div>
            <div className="singleTask-column">
              {t.endTime.replace("T", " ")}
            </div>
            <div className="singleTask-column">
              {handleSubmittedTime(t.submitTime)}
            </div>
            <div className="singleTask-column">{}</div>
            <div className="singleTask-column">{linkedTask(t)}</div>
          </div>
        );
      })}
    </div>
  );
};
