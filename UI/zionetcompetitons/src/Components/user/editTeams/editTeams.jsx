import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { TeamCard } from "../userExports";
import { useParams } from "react-router-dom";

export const EditTeams = () => {
  const { user } = useAuth0();
  const [teams, setTeams] = useState([]);
  const { id } = useParams();

  const handleAddTeam = () => {
    const add = teams;
    setTeams((teams) => [...teams, []]);
  };
  useEffect(() => {
    return async () => {};
  }, []);

  return (
    <div className="systemDash">
      <button className="btn btn-success teamCard" onClick={handleAddTeam}>
        New Team
      </button>
      <div className="teamsDiv">
        {teams.map((team, index) => {
          return (
            <TeamCard
              key={index}
              setTeams={setTeams}
              teams={teams}
              competitionID={id}
            ></TeamCard>
          );
        })}
      </div>
    </div>
  );
};
