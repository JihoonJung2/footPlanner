import React from 'react';

function EventBox(p) {
  return (
    <div className="event-box">
      <div className="event-date">{p.date}</div>
      <div className="event-teams">
        <div className="event-team">
          <img src={p.homeTeamLogo} alt="home" />
          <span>{p.home}</span>
        </div>
        <div className="vs">vs</div>
        <div className="event-team">
          <img src={p.awayTeamLogo} alt="away" />
          <span>{p.away}</span>
        </div>
      </div>
    </div>
  );
}

export default EventBox;
