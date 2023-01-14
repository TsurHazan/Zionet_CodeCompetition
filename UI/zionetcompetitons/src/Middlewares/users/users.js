import axios from "axios";

/* Check if user is signed in for the first time
   if he is then he gets registered automatically in the Database (User function in server flow)  */
export const checkIfUserInDB = async (userID) => {
  const reqURL = `http://localhost:7175/api/users/checkIfUserInDB/${userID}`;
  await axios.get(reqURL);
};

export const checkUserCompetitions = async (userID) => {
  const reqUrl = `http://localhost:7175/api/UsersCompetitions/GetAllCompetition/${userID}/`;
  console.log(reqUrl);
  const reqGet = await axios.get(reqUrl);
  console.log(reqGet);
  return reqGet;
};

export const getAllUsers = async (userID, competitionID) => {
  const reqUrl = `http://localhost:7175/api/users/getAllUsers/${userID}/${competitionID}`;
  const ans = await axios.get(reqUrl);
  return ans;
};
