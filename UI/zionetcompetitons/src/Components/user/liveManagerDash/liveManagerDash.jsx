import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useParams } from "react-router-dom";
import { updateStatusCompetition } from "../../../Middlewares/competitions.js/competitions";

export const LiveManagerDash = () => {
  const { id } = useParams();
  const { user } = useAuth0();

  const EndCopmetition = async () => {
    await updateStatusCompetition(user.sub, id, "Finished");
    window.location.href = "/Management";
  };
  return (
    <div>
      <h1>DASH</h1>
      <h2>{id}</h2>
      <button onClick={EndCopmetition}>Finish</button>
    </div>
  );
};
