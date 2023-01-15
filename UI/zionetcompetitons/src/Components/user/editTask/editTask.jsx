import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { setNewTask } from "../../../Middlewares/competitions.js/competitions";

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

  const handleChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    setnewTask((values) => ({ ...values, [name]: value }));
  };
  const sendTaskToDB = async () => {
    console.log(newTask);
    newTask.BonusPoints = parseInt(newTask.BonusPoints);
    newTask.BonusTime = parseInt(newTask.BonusTime);
    newTask.Timeframe = parseInt(newTask.Timeframe);
    newTask.points = parseInt(newTask.points);

    await setNewTask(user.sub, id, newTask);
  };

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
        <input
          type="text"
          id="CategoryID"
          value={newTask.CategoryID}
          onChange={handleChange}
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
