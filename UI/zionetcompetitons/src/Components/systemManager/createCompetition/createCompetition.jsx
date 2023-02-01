import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { getAllUsers_SM } from "../../../Middlewares/systemManager/systemManager.js";
import { useAuth0 } from "@auth0/auth0-react";
import { bgMode } from "../../../bgModeContext.js";
import { createNewCompetition } from "../../../Middlewares/systemManager/systemManager.js";
import { LoadingMagnifyingGlass } from "../../exports.js";
import { WindowSharp } from "@mui/icons-material";

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
  const [searchText, setSearchText] = useState("");

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
  const chooseManager = (user, index) => {
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
                const trya = { ["Competition"]: inputs, UsersArr };
                createNewCompetition(trya, user.sub);
                window.location.href = "/";
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
              <span>
                Start Date:
                <input
                  type="datetime-local"
                  name="Start"
                  value={
                    inputs.Start || currentDate.toISOString().substring(0, 16)
                  }
                  onChange={handleChange}
                />
              </span>
            </Grid>
            <Grid xs={6}>
              <span>
                Competition name:
                <input
                  type="text"
                  name="Name"
                  value={inputs.Name || "new competition"}
                  onChange={handleChange}
                />
              </span>
            </Grid>

            <Grid xs={6}>
              <span>
                End Date:
                <input
                  type="datetime-local"
                  name="End"
                  value={inputs.End || newDate.toISOString().substring(0, 16)}
                  onChange={handleChange}
                />
              </span>
            </Grid>

            <Grid xs={6}>
              <span>
                hashcode:
                <input
                  type="text"
                  name="hashcode"
                  value={inputs.hashcode || "twitter code"}
                  onChange={handleChange}
                />
              </span>
            </Grid>
          </Grid>
          <Grid xs={6}>
            <h3>Set Managers:</h3>
            <input
              type="search"
              className="searchBar"
              onChange={(event) => {
                setSearchText(event.target.value);
              }}
            />
            <span className="allUsersLabel">
              {allUsers.map((user, index) => {
                if (user.name.includes(searchText)) {
                  console.log(searchText);
                  return (
                    <button
                      key={user.Email + index.toString()}
                      onClick={() => {
                        chooseManager(user);
                        toggleItem(index);
                        console.log(user.name);
                      }}
                      className={`btn ${bgState} ${items[index]}`}
                    >
                      {user.name}
                    </button>
                  );
                }
              })}
            </span>
          </Grid>
        </div>
      </>
    );
  }
};
