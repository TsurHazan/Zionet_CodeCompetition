import { useAuth0 } from "@auth0/auth0-react";
import { Autocomplete, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  setNewTask,
  UpdateOneTaskOfCompetition,
} from "../../../Middlewares/competitions/competitions.js";
import { categoriesList } from "../../../Pages/editCompetition/categoriesContext.js";
import { taskObjToEdit } from "../../../Pages/editCompetition/taskContext.js";

export const EditTask = () => {
  const { id } = useParams();
  const { user } = useAuth0();
  const [newTask, setnewTask] = useState({
    CompetitionID: parseInt(id),
    CategoryID: "",
    Timeframe: 0,
    points: 0,
    Description: "Description",
    BonusPoints: 0,
    BonusTime: 0,
    name: "Name",
  });

  const { lcategories, setLcategories } = useContext(categoriesList);

  const { taskToEdit, settaskToEdit } = useContext(taskObjToEdit);
  // check if have value in state of edit is empty
  const isCreate = taskToEdit.length === 0 ? true : false;
  //for button of Create/Update competition
  const sendOrUpdate = isCreate ? "Create" : "Update";

  const handleChange = (event) => {
    let name;
    let value;
    //check its not return the div itself
    if (event._reactName === "onClick") {
      name = "CategoryID";
      value = event.target.innerHTML;

      let valLen = value.length;
      //return null for avoid bring back the div to value
      if (valLen > 50) {
        return null;
      }
      //set the info in the correct use state- Create OR Edit
      if (isCreate) {
        setnewTask((values) => ({ ...values, [name]: value }));
      } else {
        settaskToEdit((values) => ({ ...values, [name]: value }));
      }
    } else {
      name = event.target.id;
      value = event.target.value;
      //set the info in the correct use state- Create OR Edit
      if (isCreate) {
        setnewTask((values) => ({ ...values, [name]: value }));
      } else {
        settaskToEdit((values) => ({ ...values, [name]: value }));
      }
    }
  };

  const sendTaskToDB = async () => {
    //set the info in the correct use state- Create OR Edit
    //parse all int vlaue from string to int
    if (isCreate) {
      newTask.BonusPoints = parseInt(newTask.BonusPoints);
      newTask.BonusTime = parseInt(newTask.BonusTime);
      newTask.Timeframe = parseInt(newTask.Timeframe);
      newTask.points = parseInt(newTask.points);
      await setNewTask(user.sub, id, newTask);
      setnewTask({
        CompetitionID: parseInt(id),
        CategoryID: "",
        Timeframe: 0,
        points: 0,
        Description: "Description",
        BonusPoints: 0,
        BonusTime: 0,
        name: "Name",
      });
    } else {
      taskToEdit.BonusPoints = parseInt(taskToEdit.BonusPoints);
      taskToEdit.BonusTime = parseInt(taskToEdit.BonusTime);
      taskToEdit.Timeframe = parseInt(taskToEdit.Timeframe);
      taskToEdit.points = parseInt(taskToEdit.points);
      await UpdateOneTaskOfCompetition(user.sub, id, taskToEdit);
      settaskToEdit([]);
    }
  };
  return (
    <div className="taskEdit">
      <label htmlFor="name">
        Name
        <br />
        <input
          type="text"
          id="name"
          value={taskToEdit.name || newTask.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="CategoryID">
        Category
        <br />
        <Autocomplete
          className="autocompleteCategories"
          forcePopupIcon={true}
          freeSolo={true}
          disablePortal
          value={taskToEdit.CategoryID || newTask.CategoryID}
          onChange={handleChange}
          id="combo-box-demo"
          options={lcategories}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="ALL CATEGORIES" />
          )}
        />
      </label>
      <label htmlFor="Timeframe">
        Time
        <br />
        <input
          type="number"
          id="Timeframe"
          value={taskToEdit.Timeframe || newTask.Timeframe}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="points">
        Points
        <br />
        <input
          type="number"
          id="points"
          value={taskToEdit.points || newTask.points}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="BonusPoints">
        Bonus Points
        <br />
        <input
          type="number"
          id="BonusPoints"
          value={taskToEdit.BonusPoints || newTask.BonusPoints}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="BonusTime">
        Bonus Time
        <br />
        <input
          type="number"
          id="BonusTime"
          value={taskToEdit.BonusTime || newTask.BonusTime}
          onChange={handleChange}
        />
      </label>
      <label className="descriptionArea" htmlFor="Description">
        Description
        <br />
        <textarea
          id="Description"
          name="Description"
          rows="4"
          cols="60"
          onChange={handleChange}
          value={taskToEdit.Description || newTask.Description}
        ></textarea>
      </label>
      <button onClick={sendTaskToDB}>{sendOrUpdate}</button>
    </div>
  );
};
