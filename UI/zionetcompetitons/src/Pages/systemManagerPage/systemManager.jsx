import React, { useContext, useState } from "react";
import {
  SystemAdminNavbar,
  SystemAdminDashboard,
  EditCompetition_SM,
} from "../../Components/systemManager/systemManagerExports.js";
import { bgMode } from "../../bgModeContext";
import "../../Styles/systemManager.css";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { editCompetition } from "../../Components/systemManager/editCompetition_context.js";

export const SystemManagerPage = () => {
  const { bgState, setBgState } = useContext(bgMode);
  const [competitionToEdit, setcompetitionToEdit] = useState({});
  const { user } = useAuth0();
  return (
    <editCompetition.Provider
      value={{ competitionToEdit, setcompetitionToEdit }}
    >
      <div className={`${bgState} dashboard`}>
        <SystemAdminNavbar />

        <Routes>
          <Route path="/" element={<SystemAdminDashboard />} />
          <Route path="/Dashboard" element={<SystemAdminDashboard />} />
          <Route
            path="/EditCompetition/:Name"
            element={<EditCompetition_SM />}
          />
        </Routes>
      </div>
    </editCompetition.Provider>
  );
};
