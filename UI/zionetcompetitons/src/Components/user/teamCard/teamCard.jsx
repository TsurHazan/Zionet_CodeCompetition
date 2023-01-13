import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";

export const TeamCard = (arr) => {
  const { user } = useAuth0();
  const [team, setTeam] = useState([]);
  const handleAddTeamMember = () => {
    setTeam([...user.name]);
  };
  return (
    <div className="card">
      <img className="card-img-top" src="..." alt="Card image cap" />
      <div className="card-body"></div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Cras justo odio</li>
        {team.map((member) => {
          return <li className="list-group-item">{member}</li>;
        })}
      </ul>
      <div className="card-body">
        <button onClick={handleAddTeamMember}>add</button>
      </div>
    </div>
  );
};
