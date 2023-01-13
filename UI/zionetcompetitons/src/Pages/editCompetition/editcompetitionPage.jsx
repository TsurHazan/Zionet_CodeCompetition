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
      <h3>Edit Details</h3>
      <EditCompetition></EditCompetition>
      <h3>Edit Tasks & Categories</h3>
      <EditTasksAndCategories></EditTasksAndCategories>
      <h3>Edit Teams</h3>
      <EditTeams></EditTeams>
    </div>
  );
};
