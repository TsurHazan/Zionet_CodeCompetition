import React, { useEffect, useState } from "react";

export const LiveParticipantDashboard = () => {
  const [competition, setCompetition] = useState([]);

  useEffect(() => {
    // get competition information from DB
  }, []);

  return <div>LiveParticipantDashboard</div>;
};
