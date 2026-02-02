import React from 'react'

function EventBox(p) {
    return (
      <div style={{color:'black'}}>
        <img src={p.homeTeamLogo} alt="home" width="40" />
        vs
        <img src={p.awayTeamLogo} alt="away" width="40" />
        <br />
        {p.home} vs {p.away}
        
      </div>
      
     
    )
    console.log(p);
    console.log("실행");
  }
  
export default EventBox

//<div style={{ color: 'red' }}>렌더링 테스트</div>
