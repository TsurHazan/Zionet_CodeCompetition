import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { getAllUsers_SM } from "../../../Middlewares/systemManager/systemManager.js";
import { useAuth0 } from "@auth0/auth0-react";
import { bgMode } from "../../../bgModeContext.js";
import { createNewCompetition } from "../../../Middlewares/systemManager/systemManager.js";
import { LoadingMagnifyingGlass } from "../../exports.js";

export const CreateCompetition = () => {
  const { user } = useAuth0();
  const [loading, setLoading] = useState(true);

  const currentDate = new Date();
  const newDate = new Date(new Date().setDate(currentDate.getDate() + 1));

  const [inputs, setInputs] = useState({
    Start: currentDate.toISOString().substring(0, 16),
    Name: "new Competition",
    End: newDate.toISOString().substring(0, 16),
    Numberofteams: "0",
    hashcode: "noHash",
    maxactivetasks: "0",
  });
  const [allUsers, setAllUsers] = useState([]);
  const { bgState } = useContext(bgMode);
  const [UsersArr, setUsersArr] = useState([]);
  const [items, setItems] = useState(UsersArr);

  //get data from form
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const toggleItem = (index) => {
    // Create a new array with the values of the state variable
    const newItems = [...items];
    // Toggle the value at the specified index
    newItems[index] = newItems[index] === "highlight" ? "" : "highlight";
    // Set the new array as the value of the state variable
    setItems(newItems);
  };

  //add user to UsersArr state array
  const chooseManager = (user) => {
    if (UsersArr.includes(user)) {
      const newItems = UsersArr.filter((i) => i !== user);
      setUsersArr(newItems);
    } else {
      setUsersArr([...UsersArr, user]);
    }
  };

  //load all users from DB
  useEffect(() => {
    const getAllUsersFromDB = async () => {
      const all = await getAllUsers_SM(user.sub);
      const data = Object.values(all.data);
      setLoading(false);
      setAllUsers(data);
    };
    getAllUsersFromDB();
  }, [bgState]);

  if (loading) {
    return <LoadingMagnifyingGlass />;
  } else {
    return (
      <>
        <div className="createCompetition">
          <button
            className="btn btn-success"
            onClick={() => {
              //submit the competition and add to DB
              const handleSubmit = () => {
                let inputsfixed = inputs;
                inputsfixed.Start = inputsfixed.Start.replace(/[a-zA-Z]/g, " ");
                inputsfixed.End = inputsfixed.End.replace(/[a-zA-Z]/g, " ");
                setInputs(inputsfixed);
                //   setInputs(() => ({ ...inputs, ["userIDs"]: UsersArr }));
                //inputsfixed = Object.values(inputs);
                const trya = { ["Competition"]: inputs, UsersArr };
                createNewCompetition(trya, user.sub);
              };
              handleSubmit();
            }}
          >
            Create
          </button>
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
                  value={
                    inputs.Start || currentDate.toISOString().substring(0, 16)
                  }
                  onChange={handleChange}
                />
              </label>
            </Grid>
            <Grid xs={6}>
              <label>
                Competition name:
                <input
                  type="text"
                  name="Name"
                  value={inputs.Name || "new competition"}
                  onChange={handleChange}
                />
              </label>
            </Grid>

            <Grid xs={6}>
              <label>
                End Date:
                <input
                  type="datetime-local"
                  name="End"
                  value={inputs.End || newDate.toISOString().substring(0, 16)}
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
                  value={inputs.hashcode || "twitter code"}
                  onChange={handleChange}
                />
              </label>
            </Grid>
          </Grid>
          <Grid xs={6}>
            <h3>Set Managers:</h3>
            <label className="allUsersLabel">
              {allUsers.map((user, index) => {
                return (
                  <button
                    key={user.Email + index.toString()}
                    onClick={() => {
                      chooseManager(user);
                      toggleItem(index);
                    }}
                    className={`btn ${bgState} ${items[index]}`}
                  >
                    {user.name}
                  </button>
                );
              })}
            </label>
          </Grid>
        </div>
      </>
    );
  }
};
