import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { TeamCard } from "../userExports";
import { useParams } from "react-router-dom";
import {
  GetAllTeamsInCompetition,
  CreateNewTeam,
} from "../../../Middlewares/teams/teams.js";

export const EditTeams = () => {
  const { user } = useAuth0();
  const [teams, setTeams] = useState([]);
  const { id } = useParams();
  const [teamsInfo, setTeamsInfo] = useState();

  const handleAddTeam = () => {
    //CreateNewTeam(user.sub, id);
    //const add = teams;
    setTeams((teams) => [...teams, []]);
  };

  useEffect(() => {
    const getCompettitionTeams = async () => {
      const allteam = await GetAllTeamsInCompetition(user.sub, id);
      const data = await Object.values(allteam.data);
      setTeamsInfo(allteam.data);
      setTeams(data);
    };
    getCompettitionTeams();
  }, []);

  return (
    <div className="systemDash">
      <button className="btn btn-success teamCard" onClick={handleAddTeam}>
        New Team
      </button>
      <button
        className="btn btn-primary"
        onClick={() => {
          console.log(teams);
          console.log(Object.values(teamsInfo));
        }}
      >
        Update Teams
      </button>
      <div className="teamsDiv">
        {teams.map((team, index) => {
          return (
            <TeamCard
              key={index}
              setTeams={setTeams}
              teams={teams}
              competitionID={id}
              indexOfTeam={index}
            ></TeamCard>
          );
        })}
      </div>
    </div>
  );
};
