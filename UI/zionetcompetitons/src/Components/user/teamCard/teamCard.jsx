import { useAuth0 } from "@auth0/auth0-react";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { getAllUsers } from "../../../Middlewares/users/users";

export const TeamCard = ({ teams, setTeams, competitionID, indexOfTeam }) => {
  const { user } = useAuth0();
  const [team, setTeam] = useState([]);
  const [Users, setUsers] = useState([]);
  const [Value, setValue] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const users = await getAllUsers(user.sub, competitionID);
      const a = Object.values(users.data);
      await setUsers(a);
    };
    getUsers();
  }, []);

  useEffect(() => {
    let newTeams = teams;
    newTeams[indexOfTeam] = team;
    setTeams(newTeams);
  }, [team]);

  const handleAddTeamMember = () => {
    const memberInArr = Object.values(Value);
    setTeam([...team, memberInArr]);
  };

  const handleRemoveTeamMember = (member, index) => {
    setTeam((Prev) => Prev.filter((prevItem) => prevItem !== member));
  };

  return (
    <div className="card">
      <br />
      <h5>{indexOfTeam}</h5>
      <div className={"card-body"}>
        <div className="searchAndAddDiv">
          <Autocomplete
            forcePopupIcon={true}
            freeSolo={true}
            value={Value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            className={"searchUser"}
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
                label="User"
                onChange={() => {
                  console.log(params);
                }}
                {...params}
              />
            )}
          />
          <button onClick={handleAddTeamMember} className="btn btn-success">
            +
          </button>
        </div>
      </div>
      <ul className="list-group list-group-flush">
        {team.map((member, index) => {
          return (
            <li key={member[2]}>
              {member[1]}
              <button
                className="btn btn-danger"
                onClick={() => {
                  handleRemoveTeamMember(member, index);
                }}
              >
                -
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
