import axios from "axios";
let reqURL;

export const createNewCompetition = async (competitionObj, systemManagerID) => {
  reqURL = `http://localhost:7175/api/systemManager/createCompetition/${systemManagerID}`;
  await axios.post(reqURL, JSON.stringify(competitionObj));
};

export const setCompetitionManagers = async (userIDs, systemManagerID) => {
  reqURL = `http://localhost:7175/api/systemManager/setCompetitionManagers/${systemManagerID}`;
  await axios.post(reqURL, userIDs);
};

export const getAllCompetitions = async (systemManagerID) => {
  reqURL = `http://localhost:7175/api/systemManager/getAllCompetitions/${systemManagerID}`;
  return await axios.post(reqURL);
};

export const getAllCompetitonManagers = async (
  competitionID,
  systemManagerID
) => {
  reqURL = `http://localhost:7175/api/systemManager/getAllCompetitonManagers/${systemManagerID}/${competitionID}`;
  return await axios.post(reqURL);
};

export const updateCurrentCompetition = async (
  systemManagerID,
  competitionObj,
  competitionID
) => {
  reqURL = `http://localhost:7175/api/systemManager/updateCurrentCompetition/${systemManagerID}/${competitionID}`;
  return await axios.post(reqURL, competitionObj);
};

export const changeCompetitionStatus = async (
  newstatus,
  competitionID,
  systemManagerID
) => {
  reqURL = `http://localhost:7175/api/systemManager/changeCompetitionStatus/${systemManagerID}/${competitionID}`;
  await axios.post(reqURL, newstatus);
};

export const getAllUsers_SM = async (userID) => {
  reqURL = `http://localhost:7175/api/systemManager/getAllUsers/${userID}`;
  return await axios.get(reqURL);
};
