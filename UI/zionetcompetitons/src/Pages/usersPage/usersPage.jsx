import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { bgMode } from "../../bgModeContext";
import {
  ParticipantsCompetitions,
  UsersNavBar,
} from "../../Components/user/userExports.js";
import {
  ManagersCompetitions,
  EditCompetition,
} from "../../Components/user/userExports";
import { EditCompetitionPage } from "../exportPages.js";
import { Route, Routes } from "react-router-dom";
import "../../Styles/user.css";
import { LiveManagerDash } from "../../Components/user/liveManagerDash/liveManagerDash";
import { UsersHomePage } from "../../Components/user/usersHomePage/usersHomePage";

export const UsersPage = () => {
  const { bgState, setBgState } = useContext(bgMode);
  const { user } = useAuth0();

  return (
    <div className={`${bgState} dashboard`}>
      <UsersNavBar />

      <Routes>
        <Route path="/" element={<UsersHomePage />} />
        <Route path="/Management" element={<ManagersCompetitions />} />
        <Route path="/Management/:id" element={<EditCompetitionPage />} />
        <Route path="/LiveManagerDashboard/:id" element={<LiveManagerDash />} />
        <Route path="/Participate" element={<ParticipantsCompetitions />} />
      </Routes>
    </div>
  );
};
