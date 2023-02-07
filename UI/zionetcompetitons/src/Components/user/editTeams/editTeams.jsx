import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { TeamCard } from "../userExports";
import { useParams } from "react-router-dom";
import {
  GetAllTeamsInCompetition,
  CreateNewTeam,
  UpdateTeams,
} from "../../../Middlewares/teams/teams.js";

export const EditTeams = () => {
  const { user } = useAuth0();
  const [teams, setTeams] = useState([]);
  const { id } = useParams();
  const [teamsInfo, setTeamsInfo] = useState([]);

  useEffect(() => {
    const getCompettitionTeams = async () => {
      const allteam = await GetAllTeamsInCompetition(user.sub, id);
      const data = await Object.values(allteam.data);
      setTeamsInfo(data);
    };
    getCompettitionTeams();
  }, []);

  const handleUpdateTeams = async () => {
    for (let i = 0; i < teams.length; i++) {
      const singleTeam = teams[i];
      let arr = [];
      for (let x = 0; x < singleTeam.length; x++) {
        const element = {
          user_id: singleTeam[x][0],
          name: singleTeam[x][1],
          email: singleTeam[x][2],
        };
        arr.push(element);
      }
      console.log(teamsInfo);
      await UpdateTeams(user.sub, id, arr, teamsInfo[i].id);
    }
  };

  const handleAddTeam = () => {
    CreateNewTeam(user.sub, id);
    // add team;
    setTeams((teams) => [...teams, []]);
  };

  return (
    <div className="systemDash">
      <button className="btn btn-success teamCard" onClick={handleAddTeam}>
        New Team
      </button>
      <button className="btn btn-primary" onClick={handleUpdateTeams}>
        Update Teams
      </button>
      <div className="teamsDiv">
        {teamsInfo.map((team, index) => {
          return (
            <TeamCard
              key={index}
              setAllTeams={setTeams}
              allTeams={teams}
              thisTeam={team}
              indexOfTeam={index}
            ></TeamCard>
          );
        })}
      </div>
    </div>
  );
};
