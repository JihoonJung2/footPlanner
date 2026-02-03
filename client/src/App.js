import './App.css';
import 첼시_로고 from "./첼시 로고.png"
import 맨유_로고 from "./맨유 로고.png"
import 리버풀_로고 from "./리버풀 로고.png"
import 아스날_로고 from "./아스날 로고.png"
import 맨시티_로고 from "./맨시티 로고.png"
import 토트넘_로고 from "./토트넘 로고.png"
import 아스톤빌라_로고 from "./아스톤빌라 로고.png"
import EventBox from "./components/EventBox"
import { useState, useEffect } from 'react';

function App() {

  async function fetchEvent() {
    try {
      const response = await fetch("http://localhost:5000/api/event");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setEvents(jsonData);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
    
  }

  const [teams, setTeams] = useState([
    { name: '첼시', logo: 첼시_로고, like: 0 },
    { name: '맨유', logo: 맨유_로고, like: 0 },
    { name: '리버풀', logo: 리버풀_로고, like: 0 },
    { name: '아스날', logo: 아스날_로고, like: 0 },
    { name: '맨시티', logo: 맨시티_로고, like: 0 },
    { name: '토트넘', logo: 토트넘_로고, like: 0 }
  ]);

  const [events, setEvents] = useState([]);

//   async function fetchTeam() {
//   const response = await fetch("https://apiv3.apifootball.com/?action=get_events&from=2026-01-25&to=2026-02-25&league_id=152&APIkey=6ca0ec92e2cd72c313fd9c129edf6836b89f497455dd1d454548501b8f7e12f0&team_id=88");
//   const jsonData = await response.json();
//   console.log(jsonData);



// } 

  useEffect(() => {
    fetchEvent();
    //fetchTeam();
  }, []);
  console.log(events);

  function increaseLike(index) {
    const copy = [...teams];
    copy[index].like++;
    setTeams(copy);
  }

  return (
    <div className="App">
      <div className="black-nav"><h3>EPL Schedule</h3></div>
      <div className="page">
        <div className="schedule-container">
          <h2 className="container-title">Upcoming Matches</h2>
          {events.map((e, i) => (
            <EventBox key={e.key} homeTeamLogo={e.homeLogo} home={e.home} awayTeamLogo={e.awayLogo} away={e.away} date={e.matchDate} />
          ))}
        </div>

        <div className="list-container">
          <h2 className="container-title">Favorites</h2>
          {teams.map((team, i) => (
            <div className="list" key={i}>
              <h3>
                <img src={team.logo} className="로고" alt={`${team.name} logo`} />
                {team.name}
              </h3>
              <p>Likes: {team.like} <button onClick={() => increaseLike(i)}>👍</button></p>
              <button>{team.name} Schedule</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
