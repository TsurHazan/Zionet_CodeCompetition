import axios from "axios";

export const GetAvailableTasks = async (userID, competitionID, teamID) => {
  const reqURL = `http://localhost:7175/api/ParticipantActions/GetAvailableTasks/${userID}/${competitionID}/${teamID}`;
  const alltasks = await axios.get(reqURL);
  return alltasks;
};
