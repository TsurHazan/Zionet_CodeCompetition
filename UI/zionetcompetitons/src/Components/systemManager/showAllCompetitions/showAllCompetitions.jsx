import React, { useContext, useEffect, useState } from "react";
import { getAllCompetitions } from "../../../Middlewares/systemManager/systemManager.js";
import { useAuth0 } from "@auth0/auth0-react";
import { LoadingMagnifyingGlass } from "../../exports.js";
import { StatusCompetition } from "../systemManagerExports.js";
import {
  editCompetition,
  editCompetition_atom,
} from "../editCompetition_context.js";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";

export const ShowAllCompetitions = () => {
  const { user } = useAuth0();
  const [competitions, setComptitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { competitionToEdit, setcompetitionToEdit } =
    useContext(editCompetition);

  const [atomCompetitionToEdit, setAtomCompetitionToEdit] =
    useRecoilState(editCompetition_atom);

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
                <td>{c.Start.replace("T", " ")}</td>
                <td>{c.End.replace("T", " ")}</td>
                <td>{c.status}</td>
                <td>
                  <Link
                    className="btn btn-primary"
                    onClick={() => {
                      setcompetitionToEdit(c);
                      setAtomCompetitionToEdit(c);
                    }}
                    to={`/EditCompetition/${c.id}`}
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <StatusCompetition
                    competitionStatus={c.status}
                    competitionID={c.id}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
};
