import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  GetAllLiveTeams,
  GetAllTeamsInCompetition,
} from "../../../Middlewares/teams/teams";
import { submitTaskSucceeded } from "../../../Pages/editCompetition/taskContext";

export const TeamsScoreComponent = () => {
  const { id } = useParams();
  const { user } = useAuth0();
  const [teamsInfo, setTeamsInfo] = useState([]);
  const [submitTaskSuccess, setSubmitTaskSuccess] =
    useRecoilState(submitTaskSucceeded);
  let teamPlaceNumber = 0;

  const getCompettitionTeams = async () => {
    const allteam = await GetAllLiveTeams(user.sub, id);
    const data = Object.values(allteam.data);
    const sortData = data.sort((a, b) => b.points - a.points);
    setTeamsInfo(sortData);
  };
  useEffect(() => {
    const initUseEffect = async () => {
      await getCompettitionTeams();
      teamPlaceNumber = 0;
    };
    initUseEffect();
  }, [submitTaskSuccess]);
  return (
    <div className="teamsScoreComponent">
      <table>
        <thead>
          <tr>
            <th>Place</th>
            <th>Icon</th>
            <th>Name</th>
            <th>Points</th>
            <th>Finished Task</th>
            <th>Potential Points</th>
          </tr>
        </thead>
        <tbody>
          {teamsInfo.map((team) => {
            teamPlaceNumber = teamPlaceNumber + 1;
            return (
              <tr key={team.id}>
                <td>{teamPlaceNumber}</td>
                <td>
                  <img src={team.icon} alt={team.name} />
                </td>
                <td>{team.name}</td>
                <td>{team.points}</td>
                <td>{team.tasksFinished}</td>
                <td>{team.potentialPoint}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
