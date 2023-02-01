import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getUserCompetitionManagement,
  updateStatusCompetition,
} from "../../../Middlewares/competitions/competitions";
import { GetAllTeamsInCompetition } from "../../../Middlewares/teams/teams";

export const LiveManagerDash = () => {
  const { id } = useParams();
  const { user } = useAuth0();
  const [competition, setCompetition] = useState({});
  const [teamsInfo, setTeamsInfo] = useState([]);
  const [timeLeft, setTimeLeft] = useState("");

  const EndCopmetition = async () => {
    await updateStatusCompetition(user.sub, id, "Finished");
    window.location.href = "/Management";
  };

  const HandleDate = () => {
    setCompetition((values) => ({
      ...values,
      end: values.end.replace("T", " "),
      start: values.start.replace("T", " "),
    }));
  };
  const getAllCompetitionDetailsFromDB = async () => {
    const ans = await getUserCompetitionManagement(user.sub, id);
    setCompetition(ans.data);
    let nowDate = new Date();
    let newDate = new Date(ans.data.end);
    let ddd = new Date(newDate - nowDate);

    setTimeLeft(ddd.toTimeString().substring(0, 8));

    HandleDate();
  };
  const getCompettitionTeams = async () => {
    const allteam = await GetAllTeamsInCompetition(user.sub, id);
    const data = Object.values(allteam.data);
    setTeamsInfo(data);
  };
  useEffect(() => {
    const initUseEffect = async () => {
      await getAllCompetitionDetailsFromDB();
      await getCompettitionTeams();
    };
    initUseEffect();
  }, []);
  return (
    <div className="liveManagerDash">
      <h4>Live Manager DASH</h4>
      <h2>{competition.name}</h2>
      <p>Status: {competition.status}</p>
      <p>Hash Code is: {competition.hashcode}</p>
      <p>Time Left: {timeLeft}</p>
      <table>
        <thead>
          <tr>
            <th>Icon</th>
            <th>Name</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {teamsInfo.map((team) => {
            return (
              <tr key={team.id}>
                <td>
                  <img src={team.Icon} alt={team.Name} />
                </td>
                <td>{team.Name}</td>
                <td>{team.Points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>
        <button onClick={EndCopmetition}>Finish</button>
      </p>
    </div>
  );
};
