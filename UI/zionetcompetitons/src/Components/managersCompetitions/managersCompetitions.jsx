import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { bgMode } from "../../bgModeContext.js";
import { checkUserCompetitions } from "../../Middlewares/users/users.js";
import { Link } from "react-router-dom";

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
  //load all users from DB
  useEffect(() => {
    const getAllUserCompetitions = async () => {
      const all = await checkUserCompetitions(user.sub);
      console.log("user.sub", user.sub);
      console.log(all);
      console.log(all.data);
      const data = Object.values(all.data);
      console.log(data);
      setAllCompetitions(data);
    };
    getAllUserCompetitions();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {allCompetitions.map((competition) => {
            return (
              <tr key={competition.id}>
                <td>
                  <Link to={"/Management/" + competition.id}>
                    {competition.name}
                  </Link>
                </td>
                <td>{competition.start}</td>
                <td>{competition.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
