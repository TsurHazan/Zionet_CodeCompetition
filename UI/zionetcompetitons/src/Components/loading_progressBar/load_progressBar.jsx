import React from "react";
import { ProgressBar } from "react-loader-spinner";
import "../../Styles/load_progressBar.css";
export const Load_ProgressBar = () => {
  return (
    <div className="progressbar">
      <ProgressBar
        className="progressbar"
        height="35%"
        width="50%"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor="#6D67E4"
        barColor="#6D67E4"
      />
    </div>
  );
};
