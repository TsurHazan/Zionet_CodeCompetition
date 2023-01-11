import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { bgMode } from "../../bgModeContext";
import { UsersNavBar } from "../../Components/user/userExports.js";
import {
  ManagersCompetitions,
  EditCompetition,
} from "../../Components/user/userExports";
import { Route, Routes } from "react-router-dom";
import "../../Styles/user.css";

export const UsersPage = () => {
  const { bgState, setBgState } = useContext(bgMode);
  const { user } = useAuth0();

  return (
    <div className={`${bgState} dashboard`}>
      <UsersNavBar />

      <Routes>
        <Route path="/" element={<ManagersCompetitions />} />
        <Route path="/Management" element={<ManagersCompetitions />} />
        <Route path="/Management/:id" element={<EditCompetition />} />
      </Routes>
    </div>
  );
};
