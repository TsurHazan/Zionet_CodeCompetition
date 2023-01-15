import React, { useState } from "react";
import {
  EditCompetition,
  EditTasksAndCategories,
  EditTeams,
} from "../../Components/user/userExports.js";
import "../../Styles/user.css";

import { categoriesList } from "./categoriesContext.js";

export const EditCompetitionPage = () => {
  const [lcategories, setLcategories] = useState([]);

  return (
    <div className="editCompetitionPage">
      <h3>Edit Details</h3>
      <categoriesList.Provider value={{ lcategories, setLcategories }}>
        <EditCompetition></EditCompetition>
        <h3>Edit Tasks & Categories</h3>

        <EditTasksAndCategories></EditTasksAndCategories>
        <h3>Edit Teams</h3>
        <EditTeams></EditTeams>
      </categoriesList.Provider>
    </div>
  );
};
