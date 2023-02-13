import axios from "axios";

export const GetAllTeamsInCompetition = async (userID, competitionID) => {
  const reqURL = `http://localhost:7175/api/teams/GetAllTeamsInCompetition/${userID}/${competitionID}/`;
  const allteams = await axios.get(reqURL);
  return allteams;
};

export const GetAllLiveTeams = async (userID, competitionID) => {
  const reqURL = `http://localhost:7175/api/teams/GetAllLiveTeams/${userID}/${competitionID}/`;
  const allteams = await axios.get(reqURL);
  return allteams;
};

export const CreateNewTeam = async (userID, competitionID) => {
  const reqURL = `http://localhost:7175/api/teams/CreateNewTeam/${userID}/${competitionID}/`;
  await axios.post(reqURL);
};

export const GetTeamMembers = async (userID, competitionID, team) => {
  const reqURL = `http://localhost:7175/api/teams/GetTeamMembers/${userID}/${competitionID}/`;
  const json = await JSON.stringify(team);
  const teamMembers = await axios.post(reqURL, json);
  return teamMembers;
};

export const UpdateTeams = async (userID, competitionID, members, teamid) => {
  const reqURL = `http://localhost:7175/api/teams/UpdateTeams/${userID}/${competitionID}/${teamid}`;
  const json = JSON.stringify(members);
  await axios.post(reqURL, json);
};
