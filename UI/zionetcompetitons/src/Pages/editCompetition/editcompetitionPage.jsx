import React from "react";
import {
  EditCompetition,
  EditTasksAndCategories,
  EditTeams,
} from "../../Components/user/userExports.js";
import "../../Styles/user.css";

export const EditCompetitionPage = () => {
  return (
    <div className="editCompetitionPage">
      <EditCompetition></EditCompetition>
      <EditTasksAndCategories></EditTasksAndCategories>
      <EditTeams></EditTeams>
    </div>
  );
};
