import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getUserCompetitionManagement,
  updateStatusCompetition,
} from "../../../Middlewares/competitions/competitions";

export const LiveManagerDash = () => {
  const { id } = useParams();
  const { user } = useAuth0();
  const [competition, setCompetition] = useState({});

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
    HandleDate();
  };
  let newDate = new Date();
  useEffect(() => {
    const initUseEffect = async () => {
      await getAllCompetitionDetailsFromDB();
      //   await getAllCompetitionTask();
      //   await getallCategories();
    };
    initUseEffect();
  }, []);

  return (
    <div>
      <h1>DASH</h1>
      <h2>{id}</h2>
      <p>
        {competition.name} IS {competition.status}
      </p>
      <p>Hash Code is: {competition.hashcode}</p>
      <p>{newDate.toISOString().substring(0, 19).replace("T", " ")}</p>
      {/* <p>End Time is: {competition.end.substring(11, 16)}</p> */}
      <button onClick={EndCopmetition}>Finish</button>
    </div>
  );
};
