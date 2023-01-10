import axios from "axios";
let reqURL;

export const enableCompetition = async (userID, competitionID) => {
  reqURL = `http://localhost:7175/api/UsersCompetitions/EnableCompetition/${userID}`;
  return await axios.get(reqURL);
};

export const getUserCompetitionManagement = async (userID, competitionID) => {
  let reqUrl = `http://localhost:7175/api/UsersCompetitions/GetCompetition/${userID}/${competitionID}`;
  let reqGet = await axios.get(reqUrl);
  return reqGet;
};
