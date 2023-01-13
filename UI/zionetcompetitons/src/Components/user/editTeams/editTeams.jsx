import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { TeamCard } from "../userExports";

export const EditTeams = () => {
  const { user } = useAuth0();
  const [teams, setTeams] = useState([]);

  const handleAddTeam = () => {
    const add = teams;
    setTeams((teams) => [...teams, []]);
  };
  useEffect(() => {
    return async () => {};
  }, []);

  return (
    <div className="systemDash">
      <button
        onClick={() => {
          console.log(teams);
        }}
      >
        log
      </button>
      <div className="teamsDiv">
        <button className="btn btn-success teamCard" onClick={handleAddTeam}>
          add
        </button>
        {teams.map((team, index) => {
          return <TeamCard arr={team} key={index}></TeamCard>;
        })}
      </div>
    </div>
  );
};
