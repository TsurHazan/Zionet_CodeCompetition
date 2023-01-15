import React, { useState } from "react";
import {
  EditCompetition,
  EditTasksAndCategories,
} from "../../Components/user/userExports.js";
import { categoriesList } from "./categoriesContext.js";

export const EditCompetitionPage = () => {
  const [lcategories, setLcategories] = useState([]);

  return (
    <>
      <categoriesList.Provider value={{ lcategories, setLcategories }}>
        <EditCompetition />
        <EditTasksAndCategories />
      </categoriesList.Provider>
    </>
  );
};
