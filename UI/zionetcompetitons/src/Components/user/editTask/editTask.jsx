import { useAuth0 } from "@auth0/auth0-react";
import { Autocomplete, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { setNewTask } from "../../../Middlewares/competitions/competitions.js";
import { categoriesList } from "../../../Pages/editCompetition/categoriesContext.js";

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

  const handleChange = (event) => {
    let name;
    let value;
    if (event._reactName === "onClick") {
      name = "CategoryID";
      value = event.target.innerHTML;

      let valLen = value.length;
      if (valLen > 50) {
        return;
      }
      setnewTask((values) => ({ ...values, [name]: value }));
    } else {
      name = event.target.id;
      value = event.target.value;

      setnewTask((values) => ({ ...values, [name]: value }));
    }
  };
  const sendTaskToDB = async () => {
    console.log(newTask);
    newTask.BonusPoints = parseInt(newTask.BonusPoints);
    newTask.BonusTime = parseInt(newTask.BonusTime);
    newTask.Timeframe = parseInt(newTask.Timeframe);
    newTask.points = parseInt(newTask.points);

    await setNewTask(user.sub, id, newTask);

    //get all geteg
  };
  console.log(newTask);
  return (
    <div className="taskEdit">
      <label htmlFor="name">
        Name
        <br />
        <input
          type="text"
          id="name"
          value={newTask.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="CategoryID">
        Category
        <br />
        {/* <input
          type="text"
          id="CategoryID"
          value={newTask.CategoryID}
          onChange={handleChange}
        /> */}
        <Autocomplete
          forcePopupIcon={true}
          freeSolo={true}
          disablePortal
          value={newTask.CategoryID}
          onChange={handleChange}
          // onChange={(event, value) => {
          //   handleChange(value.label);
          // }}

          // getOptionLabel={(option) => {
          //   if (typeof option === "string") {
          //     return option;
          //   }

          //   if (option.inputValue) {
          //     return option.inputValue;
          //   }
          //   return option.label;
          // }}
          // onChange={(event, value) => {
          //   setV(value.label);
          // }}

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
          value={newTask.Timeframe}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="points">
        Points
        <br />
        <input
          type="number"
          id="points"
          value={newTask.points}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="BonusPoints">
        Bonus Points
        <br />
        <input
          type="number"
          id="BonusPoints"
          value={newTask.BonusPoints}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="BonusTime">
        Bonus Time
        <br />
        <input
          type="number"
          id="BonusTime"
          value={newTask.BonusTime}
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
          defaultValue={newTask.Description}
        ></textarea>
        {/* <input
          type="textarea"
          id="Description"
          value={newTask.Description}
          onChange={handleChange}
        /> */}
      </label>
      <button onClick={sendTaskToDB}>Create Task</button>
    </div>
  );
};
