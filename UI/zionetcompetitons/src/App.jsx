import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Load_ProgressBar, SystemAdminNavbar } from "./Components/exports";
import { bgMode } from "./bgModeContext";
import {
  checkIfUserInDB,
  checkUserCompetitions,
} from "./Middlewares/users/users";
import {
  UsersPage,
  VisitiorsPage,
  SystemManagerPage,
} from "./Pages/exportPages.js";
export const App = () => {
  const [bgState, setBgState] = useState(localStorage.Theme);
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Load_ProgressBar />;
  }
  if (isAuthenticated) {
    const checkDB = async () => {
      let msg = await checkIfUserInDB(user.sub, user.given_name);
      const userComp = await checkUserCompetitions(user.sub);
      // alert(msg);
    };
    checkDB();

    if (user.role[0] === "System Manager") {
      return (
        <bgMode.Provider value={{ bgState, setBgState }}>
          <SystemManagerPage />
        </bgMode.Provider>
      );
    } else {
      return (
        <bgMode.Provider value={{ bgState, setBgState }}>
          <UsersPage></UsersPage>
        </bgMode.Provider>
      );
    }
  } else {
    return <VisitiorsPage />;
  }
};
