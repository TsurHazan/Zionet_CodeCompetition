import React, { useState } from "react";
import { changeCompetitionStatus } from "../../../Middlewares/systemManager/systemManager";
import { useAuth0 } from "@auth0/auth0-react";

export const StatusCompetition = ({ competitionStatus, competitionID }) => {
  const { user } = useAuth0();

  const [status, setStatus] = useState(competitionStatus);
  const handleStatus = async () => {
    const changeStatus = () => {
      if (status === "Disabled") {
        return "In Preparation";
      } else {
        return "Disabled";
      }
    };
    competitionStatus = await changeStatus();
    setStatus(competitionStatus);
    await changeCompetitionStatus(competitionStatus, competitionID, user.sub);
  };

  return (
    <button onClick={handleStatus} className="btn btn-success">
      {status}
    </button>
  );
};
