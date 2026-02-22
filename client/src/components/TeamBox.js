import React from 'react';



function TeamBox(p){

    return(
    <div className="card team-card">
      <div className="team-logo-container">
        <img src={p.logo} alt={p.name} onClick={()=>{p.changeSchedule(p.keyId)}}></img>
      </div>
      <div className="team-details">
        <span className="team-name-text">{p.name}</span>
        {p.ranking && <span className="team-ranking">Ranking: {p.ranking}</span>}
        {p.winningPoint && <span className="team-winning-point">Winning Point: {p.winningPoint}</span>}
      </div>
      <button onClick={()=>{
        if(!p.isLoggedIn){p.showModal()}
        else if(p.isLoggedIn){p.addFavorites(p.keyId)}
       p.setFavoriteId(prev => [...prev, p.keyId]); 
        }}>
        즐겨찾기 추가</button>
    </div>)
}

export default TeamBox