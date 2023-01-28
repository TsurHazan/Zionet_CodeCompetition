import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { bgMode } from "../../bgModeContext";
import {
  ParticipantsCompetitions,
  UsersNavBar,
} from "../../Components/user/userExports";
import "../../Styles/user.css";

export const ParticipantPage = () => {
  const { bgState, setBgState } = useContext(bgMode);
  const { user } = useAuth0();

  return (
    <div className={`${bgState} dashboard`}>
      <UsersNavBar />

      <Routes>
        <Route path="/" element={<ParticipantsCompetitions />} />
      </Routes>
    </div>
  );
};
