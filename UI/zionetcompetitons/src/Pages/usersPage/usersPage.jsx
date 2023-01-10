import React, { useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { bgMode } from "../../bgModeContext";
import { UsersNavBar } from "../../Components/user/userExports.js";
import { ManagersCompetitions } from "../../Components/managersCompetitions/managersCompetitions";
import { Route, Routes, useParams } from "react-router-dom";
import "../../Styles/user.css";
import { EditCompetition } from "../../Components/editCompetition/editCompetition";

export const UsersPage = () => {
  const { bgState, setBgState } = useContext(bgMode);
  const { user } = useAuth0();

  return (
    <div className={bgState}>
      <UsersNavBar />
      <h1>Welcome {user.name}</h1>
      <Routes>
        <Route path="/Management" element={<ManagersCompetitions />} />
        <Route path="/Management/:id" element={<EditCompetition />} />
      </Routes>
    </div>
  );
};
