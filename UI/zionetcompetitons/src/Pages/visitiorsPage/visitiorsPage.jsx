import React from "react";
import { LoginButton } from "../../Components/exports.js";
export const VisitiorsPage = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-heading">Welcome!</h1>
        <h2 className="welcome-heading">Log in to access your dashboard</h2>
        <LoginButton />
      </div>
    </div>
  );
};
