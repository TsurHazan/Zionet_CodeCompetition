import React, { useContext, useEffect, useState } from "react";
import { getAllCompetitions } from "../../../Middlewares/systemManager/systemManager.js";
import { useAuth0 } from "@auth0/auth0-react";
import { LoadingMagnifyingGlass } from "../../exports.js";
import { EditCompetition_SM } from "../systemManagerExports.js";
import { editCompetition } from "../editCompetition_context.js";
import { Link } from "react-router-dom";

export const ShowAllCompetitions = () => {
  const { user } = useAuth0();
  const [competitions, setComptitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { competitionToEdit, setcompetitionToEdit } =
    useContext(editCompetition);

  useEffect(() => {
    const getCompetitions = async () => {
      let answer = await getAllCompetitions(user.sub);
      answer = answer.data;
      setLoading(false);
      const rows = Object.keys(answer).map((c) => answer[c]);
      setComptitions(rows);
    };
    getCompetitions();
  }, [user]);
  if (loading) {
    return <LoadingMagnifyingGlass />;
  } else {
    return (
      <table className="allCompetitions">
        <thead>
          <tr className="text-primary ">
            <th>Name</th>
            <th>Teams</th>
            <th>Max Active Tasks</th>
            <th>hashcode</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {competitions.map((c) => {
            c.End = c.End.replace("T", " ");
            c.Start = c.Start.replace("T", " ");
            return (
              <tr key={c.id}>
                <td>{c.Name}</td>
                <td>{c.numOfTeams}</td>
                <td>{c.maxActiveTasks}</td>
                <td>{c.hashcode}</td>
                <td>{c.Start}</td>
                <td>{c.End}</td>
                <td>{c.status}</td>
                <td>
                  <Link
                    className="btn btn-primary"
                    onClick={() => {
                      setcompetitionToEdit(c);
                    }}
                    to={`/EditCompetition/${c.Name}`}
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button className="btn btn-success">Enable</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
};
