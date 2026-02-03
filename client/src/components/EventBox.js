import React from 'react'

function EventBox(p) {
    return (
      <div className="card event-card">
        <span className="date">{p.date}</span>
        <div className="team-info">
          <img src={p.homeTeamLogo} alt={p.home} />
          <span className="team-name">{p.home}</span>
        </div>
        <span className="vs">vs</span>
        <div className="team-info">
          <img src={p.awayTeamLogo} alt={p.away} />
          <span className="team-name">{p.away}</span>
        </div>
      </div>
    )
  }
  
export default EventBox

