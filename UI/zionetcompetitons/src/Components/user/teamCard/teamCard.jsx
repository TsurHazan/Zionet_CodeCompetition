import { useAuth0 } from "@auth0/auth0-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { getAllUsers } from "../../../Middlewares/users/users";
import { useParams } from "react-router-dom";

export const TeamCard = ({ teams, setTeams, competitionID }) => {
  const { user } = useAuth0();
  const [team, setTeam] = useState([]);
  const [Users, setUsers] = useState([]);
  const [Value, setValue] = useState("name");

  useEffect(() => {
    const getUsers = async () => {
      const users = await getAllUsers(user.sub, competitionID);
      const a = Object.values(users.data);
      await setUsers(a);
    };
    getUsers();
  }, []);

  const handleAddTeamMember = (newTeamMember) => {
    const currentTeamIndex = teams.indexOf(team);

    setTeam([...team, newTeamMember]);
    console.log(Value);
    console.log(teams);
  };

  //<li className="list-group-item">Cras justo odio</li>
  return (
    <div className="card">
      <img
        className="card-img-top"
        src="https://images.unsplash.com/photo-1592811864976-cf898030c3bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1161&q=80"
        alt="Card cap"
      />
      <button
        onClick={() => {
          console.log(team, "::::", teams);
        }}
      >
        log
      </button>
      <div className="card-body">
        <div className="searchAndAddDiv">
          <Autocomplete
            forcePopupIcon={true}
            freeSolo={true}
            value={Value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            className="searchUser"
            disablePortal
            options={Users}
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                return option;
              }

              if (option.inputValue) {
                return option.inputValue;
              }
              return option.name;
            }}
            id="combo-box-demo"
            sx={{ width: 150, height: 50 }}
            renderInput={(params) => (
              <TextField
                onChange={() => {
                  console.log(params);
                }}
                {...params}
              />
            )}
          />
          <button
            onClick={() => handleAddTeamMember(Value)}
            className="btn btn-success"
          >
            Add
          </button>
        </div>
      </div>
      <ul className="list-group list-group-flush">
        {team.map((member) => {
          return <li>{member.name}</li>;
        })}
      </ul>
    </div>
  );
};
