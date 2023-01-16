import axios from "axios";

export const GetAllTeamsInCompetition = async (userID, competitionID) => {
  const reqURL = `http://localhost:7175/api/teams/GetAllTeamsInCompetition/${userID}/${competitionID}`;
  const allteams = await axios.get(reqURL);
  return allteams;
};

export const CreateNewTeam = async (userID, competitionID) => {
  const reqURL = `http://localhost:7175/api/teams/CreateNewTeam/${userID}/${competitionID}`;
  await axios.post(reqURL);
};
