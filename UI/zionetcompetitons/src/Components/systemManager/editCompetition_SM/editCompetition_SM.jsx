import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useAuth0 } from "@auth0/auth0-react";
import { bgMode } from "../../../bgModeContext.js";
import {
  getAllUsers_SM,
  updateCurrentCompetition,
  getAllCompetitonManagers,
} from "../../../Middlewares/systemManager/systemManager.js";
import { LoadingMagnifyingGlass } from "../../exports.js";
import { editCompetition } from "../editCompetition_context.js";
import { DeleteCompetition } from "../deleteCompetition/deleteCompetition.jsx";

export const EditCompetition_SM = () => {
  const { user } = useAuth0();
  const [loading, setLoading] = useState(true);
  const { competitionToEdit, setcompetitionToEdit } =
    useContext(editCompetition);

  const [inputs, setInputs] = useState({
    id: competitionToEdit.id,
    Start: competitionToEdit.Start,
    Name: competitionToEdit.Name,
    End: competitionToEdit.End,
    Numberofteams: competitionToEdit.numOfTeams,
    hashcode: competitionToEdit.hashcode,
    maxactivetasks: competitionToEdit.maxActiveTasks,
  });
  const [allUsers, setAllUsers] = useState([]);
  const { bgState } = useContext(bgMode);

  const [ManagersArr, setManagersArr] = useState([]);
  const [items, setItems] = useState(ManagersArr);

  //get data from labels
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const toggleItem = (index) => {
    const newItems = [...items];
    newItems[index] = newItems[index] === "highlight" ? "" : "highlight";
    setItems(newItems);
  };

  //add user to ManagersArr state array
  const chooseManager = (user, index) => {
    if (ManagersArr.includes(user)) {
      const newItems = ManagersArr.filter((i) => i !== user);
      setManagersArr(newItems);
    } else {
      setManagersArr([...ManagersArr, user]);
    }
  };

  //load all users and managers from DB
  useEffect(() => {
    const getAllUsersFromDB = async () => {
      const allUsers = await getAllUsers_SM(user.sub);
      const managers = await getAllCompetitonManagers(
        competitionToEdit.id,
        user.sub
      );
      const allUsersData = Object.values(allUsers.data);
      const allManagersData = Object.values(managers.data);
      setLoading(false);
      setAllUsers(allUsersData);
      setManagersArr(allManagersData);
    };
    getAllUsersFromDB();
  }, [bgState]);

  if (loading) {
    return <LoadingMagnifyingGlass />;
  } else {
    return (
      <>
        <Grid xs={6}>
          <button
            className="btn btn-success"
            onClick={() => {
              //update competition on DB
              const handleSubmit = async () => {
                let inputsfixed = inputs;
                inputsfixed.Start = inputsfixed.Start.replace(/[a-zA-Z]/g, " ");
                inputsfixed.End = inputsfixed.End.replace(/[a-zA-Z]/g, " ");
                setInputs(inputsfixed);
                const trya = { ["Competition"]: inputs, ManagersArr };
                window.location.href = "/";
                await updateCurrentCompetition(user.sub, trya, inputs.id);
              };
              handleSubmit();
            }}
          >
            Update
          </button>
        </Grid>

        <div className="EditCompetition_SM">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid xs={6}>
              <label>
                Start Date:
                <input
                  type="datetime-local"
                  name="Start"
                  onChange={handleChange}
                  value={inputs.Start}
                />
              </label>
            </Grid>
            <Grid xs={6}>
              <label>
                Competition name:
                <input
                  type="text"
                  name="Name"
                  value={inputs.Name}
                  onChange={handleChange}
                />
              </label>
            </Grid>

            <Grid xs={6}>
              <label>
                End Date:
                <input
                  value={inputs.End}
                  type="datetime-local"
                  name="End"
                  onChange={handleChange}
                />
              </label>
            </Grid>

            <Grid xs={6}>
              <label>
                hashcode:
                <input
                  type="text"
                  name="hashcode"
                  value={inputs.hashcode}
                  onChange={handleChange}
                />
              </label>
            </Grid>
          </Grid>
          <Grid xs={6} className="usersGrid">
            <h2>Users</h2>
            <h2>Current Managers</h2>
            <label className="allUsersLabel">
              {allUsers.map((user, index) => {
                if (!ManagersArr.includes()) {
                  return (
                    <button
                      key={user.Email + index.toString()}
                      onClick={() => {
                        chooseManager(user, index);
                        // toggleItem(index);
                      }}
                      className={`btn ${bgState} ${items[index]}`}
                    >
                      {user.name}
                    </button>
                  );
                }
              })}
            </label>

            <label className="allUsersLabel">
              {ManagersArr.map((user, index) => {
                return (
                  <button
                    key={user.Email + index.toString()}
                    onClick={() => {
                      chooseManager(user);
                      // toggleItem(index);
                    }}
                    className={`btn ${bgState} ${items[index]}`}
                  >
                    {user.name}
                  </button>
                );
              })}
            </label>
          </Grid>
          <Grid xs={6}>
            <DeleteCompetition
              competitionID={inputs.id}
              competitionName={inputs.Name}
            />
          </Grid>
        </div>
      </>
    );
  }
};
