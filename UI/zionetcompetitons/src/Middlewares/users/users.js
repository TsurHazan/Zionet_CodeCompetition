import axios from "axios";
let reqURL;
/* Check if user is signed in for the first time
   if he is then he gets registered automatically in the Database (User function in server flow)  */
export const checkIfUserInDB = async (userID) => {
  reqURL = `http://localhost:7175/api/checkIfUserInDB/${userID}`;
  let cb = await axios.get(reqURL);
  if (cb === false || cb === "false") {
    alert("Welcome! we registered you in our system.. Good luck!");
  }
};

export const getAllUsers = async (userID) => {
  reqURL = `http://localhost:7175/api/systemManager/getAllUsers/${userID}`;
  return await axios.get(reqURL);
};
//Welcome! we registered you in our system.. Good luck!

export const checkUserCompetitions = async (userID) => {
  console.log(userID);
  let reqUrl = `http://localhost:7175/api/UsersCompetitions/GetAllCompetition/${userID}`;
  console.log(reqUrl);
  let reqGet = await axios.get(reqUrl);
  console.log(reqGet, reqGet.data);
  return reqGet;
};
