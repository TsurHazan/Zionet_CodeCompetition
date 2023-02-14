import axios from "axios";

export const GetAvailableTasks = async (userID, competitionID, teamID) => {
  const reqURL = `http://localhost:7175/api/ParticipantActions/GetAvailableTasks/${userID}/${competitionID}/${teamID}`;
  const alltasks = await axios.get(reqURL);
  return alltasks;
};

export const ChooseTask = async (
  userID,
  competitionID,
  teamID,
  taskID,
  timeframe
) => {
  const reqURL = `http://localhost:7175/api/ParticipantActions/ChooseTask/${userID}/${competitionID}/${teamID}/${taskID}/${timeframe}`;
  const answer = await axios.get(reqURL);
  return answer;
};

export const GetTaskHistory = async (userID, competitionID, teamID) => {
  const reqURL = `http://localhost:7175/api/ParticipantActions/TeamTasksHistory/${userID}/${competitionID}/${teamID}`;
  const answer = await axios.get(reqURL);
  return answer;
};

export const GetSolveTaskTabInformation = async (
  userID,
  competitionID,
  teamID,
  taskID
) => {
  console.log(userID, competitionID, teamID, taskID);
  const reqURL = `http://localhost:7175/api/ParticipantActions/GetSolveTaskTabInformation/${userID}/${competitionID}/${teamID}/${taskID}`;
  const answer = await axios.get(reqURL);
  return answer;
};
