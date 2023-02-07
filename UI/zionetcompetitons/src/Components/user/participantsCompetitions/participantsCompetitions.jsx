import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { bgMode } from "../../../bgModeContext.js";
import {
  GetAllParticipantCompetition,
  FindParticipantTeam,
} from "../../../Middlewares/users/users.js";

export const ParticipantsCompetitions = () => {
  const { user } = useAuth0();
  const [allCompetitions, setAllCompetitions] = useState([]);
  const { bgState } = useContext(bgMode);

  useEffect(() => {
    const getAllUserCompetitions = async () => {
      const allCompetitionsJSON = await GetAllParticipantCompetition(user.sub);
      const allCompetitionsDATA = Object.values(allCompetitionsJSON.data);
      setAllCompetitions(allCompetitionsDATA);
    };
    getAllUserCompetitions();
  }, []);

  const FindParticipantTeamID = async (competitionID) => {
    const competitionIDjson = await FindParticipantTeam(
      user.sub,
      competitionID
    );
    const competitionIDdata = Object.values(competitionIDjson.data);
    window.location.href = `/LiveCompetitionDashboard/${isRunning.id}/${competitionIDdata}`;
  };

  const isRunning = allCompetitions.find((c) => {
    return c.status === "Running";
  });
  if (isRunning === undefined) {
    return (
      <div>
        <h2>Welcome {user.name}</h2>
        <h3>This is your next competitons:</h3>
        <table className="allCompetitions">
          <thead>
            <tr>
              <th>Name</th>
              <th>Start Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allCompetitions.map((competition) => {
              if (competition.status !== "Finished") {
                return (
                  <tr key={competition.id}>
                    <td>{competition.name}</td>
                    <td>{competition.start.replace("T", " ")}</td>
                    <td>{competition.status}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    FindParticipantTeamID(isRunning.id);
  }
};
