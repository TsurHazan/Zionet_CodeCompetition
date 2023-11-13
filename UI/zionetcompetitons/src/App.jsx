import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Load_ProgressBar } from "./Components/exports";
import { bgMode } from "./bgModeContext";
import { checkIfUserInDB } from "./Middlewares/users/users";
import {
  UsersPage,
  VisitiorsPage,
  SystemManagerPage,
} from "./Pages/exportPages.js";
import { RecoilRoot } from "recoil";

export const App = () => {
  const [bgState, setBgState] = useState(localStorage.Theme);
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Load_ProgressBar />;
  }
  if (isAuthenticated) {
    const checkDB = async () => {
      let msg = await checkIfUserInDB(user.sub);

      // alert(msg);
    };
    checkDB();

    // debugger;

    // if (user.role[0] === "System Manager") {
    if (user.sub === "google-oauth2|109366188883049395488") {
      return (
        <bgMode.Provider value={{ bgState, setBgState }}>
          <SystemManagerPage />
        </bgMode.Provider>
      );
    } else {
      return (
        <bgMode.Provider value={{ bgState, setBgState }}>
          <RecoilRoot>
            <UsersPage />
          </RecoilRoot>
        </bgMode.Provider>
      );
    }
  } else {
    return <VisitiorsPage />;
  }
};
