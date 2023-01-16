import React, { useState } from "react";
import {
  EditCompetition,
  EditTasksAndCategories,
  EditTeams,
} from "../../Components/user/userExports.js";
import "../../Styles/user.css";

import { categoriesList } from "./categoriesContext.js";
import { taskObjToEdit } from "./taskContext.js";

export const EditCompetitionPage = () => {
  const [lcategories, setLcategories] = useState([]);
  const [taskToEdit, settaskToEdit] = useState([]);

  return (
    <div className="editCompetitionPage">
      <h3>Edit Details</h3>
      <categoriesList.Provider value={{ lcategories, setLcategories }}>
        <EditCompetition></EditCompetition>
        <h3>Edit Tasks & Categories</h3>
        <taskObjToEdit.Provider value={{ taskToEdit, settaskToEdit }}>
          <EditTasksAndCategories></EditTasksAndCategories>
        </taskObjToEdit.Provider>
        <h3>Edit Teams</h3>
        <EditTeams></EditTeams>
      </categoriesList.Provider>
    </div>
  );
};
