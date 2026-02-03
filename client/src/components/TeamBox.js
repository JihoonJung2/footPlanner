import React from "react";

function TeamBox(p){
    return(
    <div className="card team-card">
      <img src={p.logo} alt={p.name}></img>
      <span className="team-name-text">{p.name}</span>
      <button onClick={()=>{p.changeSchedule(p.keyId)}}>일정 보러가기</button>
    </div>)
}

export default TeamBox