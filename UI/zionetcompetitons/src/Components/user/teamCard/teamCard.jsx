import { User, useAuth0 } from "@auth0/auth0-react";
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
import { GetTeamMembers } from "../../../Middlewares/teams/teams";

export const TeamCard = ({ allTeams, setAllTeams, thisTeam, indexOfTeam }) => {
  const { user } = useAuth0();
  const [team, setTeam] = useState([]);
  const [Users, setUsers] = useState([]);
  const [Value, setValue] = useState("");
  const [members, setMembers] = useState();

  useEffect(() => {
    const getUsers = async () => {
      const users = await getAllUsers(user.sub, thisTeam.CompetitionID);
      const usersData = Object.values(users.data);
      await setUsers(usersData);
      let newTeams = allTeams;
      newTeams[indexOfTeam] = team;
      setAllTeams(newTeams);
    };
    getUsers();
  }, [team.length]);

  useEffect(() => {
    const getMembers = async () => {
      const teamMembers = await GetTeamMembers(
        user.sub,
        thisTeam.CompetitionID,
        thisTeam
      );
      const data = await teamMembers.data;
      setTeam(
        Object.values(data).map((o) => {
          return Object.values(o);
        })
      );
    };

    getMembers();
  }, []);

  const handleAddTeamMember = () => {
    const memberInArr = Object.values(Value);
    setTeam([...team, memberInArr]);
  };

  const handleRemoveTeamMember = (member) => {
    setTeam((Prev) => Prev.filter((prevItem) => prevItem !== member));
  };

  return (
    <div className="card">
      <button
        onClick={() => {
        
        }}
      >
        {thisTeam.Name}
      </button>
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
            renderInput={(params) => <TextField label="User" {...params} />}
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
