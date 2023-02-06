import axios from "axios";
let reqUrl;
let reqGet;
export const UpdateOneTaskOfCompetition = async (
  userID,
  competitionID,
  task
) => {
  reqUrl = `http://localhost:7175/api/Competition/UpdateOneTask/${userID}/${competitionID}`;
  reqGet = await axios.post(reqUrl, task);
  return reqGet;
};

export const DeleteOneTask = async (userID, competitionID, taskID) => {
  reqUrl = `http://localhost:7175/api/Competition/DeleteOneTask/${userID}/${competitionID}`;
  reqGet = await axios.post(reqUrl, taskID);
  return reqGet;
};

export const getUserCompetitionManagement = async (userID, competitionID) => {
  reqUrl = `http://localhost:7175/api/UsersCompetitions/GetCompetition/${userID}/${competitionID}`;
  reqGet = await axios.get(reqUrl);
  return reqGet;
};

export const updateCompetitionManagement = async (userID, competition) => {
  reqUrl = `http://localhost:7175/api/UsersCompetitions/UpdateCompetition/${userID}`;
  reqGet = await axios.post(reqUrl, competition);
  return reqGet;
};

export const getCategories = async () => {
  reqUrl = `http://localhost:7175/api/competition/GetCategories`;
  reqGet = await axios.get(reqUrl);
  return reqGet;
};
export const setNewCategory = async (category) => {
  reqUrl = `http://localhost:7175/api/UsersCompetitions/UpdateCategory/${category}`;
  reqGet = await axios.post(reqUrl, category);
  return reqGet;
};

export const getCompetitionTask = async (userID, competitionID) => {
  reqUrl = `http://localhost:7175/api/competition/GetTask/${userID}/${competitionID}`;
  reqGet = await axios.get(reqUrl);
  return reqGet;
};
export const setNewTask = async (userID, competitionID, task) => {
  reqUrl = `http://localhost:7175/api/UsersCompetitions/UpdateTask/${userID}/${competitionID}`;
  reqGet = await axios.post(reqUrl, task);
  return reqGet;
};

export const updateStatusCompetition = async (
  userID,
  competitionID,
  newStatus
) => {
  reqUrl = `http://localhost:7175/api/UsersCompetitions/UpdateCompetitionStatus/${userID}/${competitionID}`;
  reqGet = await axios.post(reqUrl, newStatus);
  return reqGet;
};
export const getSubmittedTask = async (userID, competitionID) => {
  reqUrl = `http://localhost:7175/api/competition/GetSubmittedTasks/${userID}/${competitionID}`;
  reqGet = await axios.get(reqUrl);
  return reqGet;
};

export const confirmSubmittedTask = async (
  userID,
  competitionID,
  enterPoint,
  submittesTask
) => {
  reqUrl = `http://localhost:7175/api/UsersCompetitions/ConfirmSubmittedTask/${userID}/${competitionID}/${enterPoint}`;
  reqGet = await axios.post(reqUrl, submittesTask);
  return reqGet;
};
