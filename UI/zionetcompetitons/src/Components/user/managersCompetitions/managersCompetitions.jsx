import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { bgMode } from "../../../bgModeContext.js";
import { checkUserCompetitions } from "../../../Middlewares/users/users.js";
import { Link } from "react-router-dom";
import {
  updateCompetitionManagement,
  updateStatusCompetition,
} from "../../../Middlewares/competitions/competitions.js";

export const ManagersCompetitions = () => {
  const [allCompetitions, setAllCompetitions] = useState([]);
  const { user } = useAuth0();
  const { bgState } = useContext(bgMode);
  //const [CompetitionsArr, setCompetitionsArr] = useState([]);
  //const [Competition, setCompetition] = useState(CompetitionsArr);

  /*const toggleItem = (index) => {
    // Create a new array with the values of the state variable
    const newCompetition = [...Competition];
    // Toggle the value at the specified index
    newCompetition[index] =
      newCompetition[index] === "highlight" ? "" : "highlight";
    // Set the new array as the value of the state variable
    setCompetition(newCompetition);
  };

   const chooseManager = (user) => {
    if (CompetitionsArr.includes(user)) {
      const newCompetition = UsersArr.filter((i) => i !== user);
      setUsersArr(newCompetition);
    } else {
      setUsersArr([...CompetitionsArr, user]);
    }
  };
*/
  const startCopmetition = async (competitionID) => {
    await updateStatusCompetition(user.sub, competitionID, "Running");
    let ref = "/LiveManagerDashboard/" + competitionID;
    window.location.href = ref;
  };

  //load all users from DB
  useEffect(() => {
    const getAllUserCompetitions = async () => {
      const all = await checkUserCompetitions(user.sub);
      const data = Object.values(all.data);
      setAllCompetitions(data);
    };
    getAllUserCompetitions();
  }, []);

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <table className="allCompetitions">
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {allCompetitions.map((competition) => {
            let forBtn = competition.status;
            let toDisabled;
            if (forBtn === "In Preparation") {
              forBtn = "Start";
              toDisabled = false;
            } else if (forBtn === "Running") {
              forBtn = "Enter";
              toDisabled = false;
            } else {
              forBtn = "Finish";
              toDisabled = true;
            }
            return (
              <tr key={competition.id}>
                <td>{competition.name}</td>
                <td>{competition.start.replace("T", " ")}</td>
                <td>{competition.status}</td>
                <td>
                  <Link to={"/Management/" + competition.id}>Edit</Link>
                </td>
                <td>
                  <button
                    onClick={() => {
                      startCopmetition(competition.id);
                    }}
                    disabled={toDisabled}
                  >
                    {forBtn}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
