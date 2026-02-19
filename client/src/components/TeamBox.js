import React from 'react';



function TeamBox(p){
  
    return(
    <div className="card team-card">
      <img src={p.logo} alt={p.name} onClick={()=>{p.changeSchedule(p.keyId)}}></img>
      <span className="team-name-text">{p.name}</span>
      <button onClick={()=>{
        if(!p.isLoggedIn){p.showModal()}
        else if(p.isLoggedIn){p.addFavorites()}
        }}>
        
          
          
          즐겨찾기 추가</button>
    </div>)
}

export default TeamBox