import axios from "axios";

/* Check if user is signed in for the first time
   if he is then he gets registered automatically in the Database (User function in server flow)  */
export const checkIfUserInDB = async (userID) => {
  const reqURL = `http://localhost:7175/api/users/checkIfUserInDB/${userID}`;
  await axios.get(reqURL);
};

export const GetAllManagerCompetition = async (userID) => {
  const reqUrl = `http://localhost:7175/api/UsersCompetitions/GetAllManagerCompetition/${userID}/`;
  const reqGet = await axios.get(reqUrl);
  return reqGet;
};

export const GetAllParticipantCompetition = async (userID) => {
  const reqUrl = `http://localhost:7175/api/UsersCompetitions/GetAllParticipantCompetition/${userID}/`;
  const reqGet = await axios.get(reqUrl);
  return reqGet;
};

export const FindParticipantTeam = async (userID, competitionID) => {
  const reqUrl = `http://localhost:7175/api/ParticipantActions/FindParticipantTeam/${userID}/${competitionID}`;
  const reqGet = await axios.get(reqUrl);
  console.log(reqGet);
  return reqGet;
};

export const getAllUsers = async (userID, competitionID) => {
  const reqUrl = `http://localhost:7175/api/users/getAllUsers/${userID}/${competitionID}`;
  const reqGet = await axios.get(reqUrl);
  return reqGet;
};

export const GetCompetition = async (userID, competitionID) => {
  const reqUrl = `http://localhost:7175/api/UsersCompetitions/GetCompetition/${userID}/${competitionID}`;
  const reqGet = await axios.get(reqUrl);
  return reqGet;
};
