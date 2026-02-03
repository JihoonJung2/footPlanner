import './App.css';
import 첼시_로고 from "./첼시 로고.png"
import 맨유_로고 from "./맨유 로고.png"
import 리버풀_로고 from "./리버풀 로고.png"
import 아스날_로고 from "./아스날 로고.png"
import 맨시티_로고 from "./맨시티 로고.png"
import 토트넘_로고 from "./토트넘 로고.png"
import 아스톤빌라_로고 from "./아스톤빌라 로고.png"
import EventBox from "./components/EventBox"
import TeamBox from "./components/TeamBox"
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
  async function fetchSpecificEvent(tk) {
    try {
      const response = await fetch(`http://localhost:5000/api/event/${tk}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setEvents(jsonData);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    
    }
  }
  
  async function fetchTeam(){
    try{
      const response=await fetch("http://localhost:5000/api/eplTeams")
        if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setTeams(jsonData);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  }

  const [teams, setTeams] = useState([]);
  //key, name, logo
  const [events, setEvents] = useState([]);
  //key, home, homeLogo, away, awayLogo, matchDate



  useEffect(() => {
    fetchEvent();
    fetchTeam();
  }, []);
  
  const changeSchedule=(key)=>{
    
    if(key)
      fetchSpecificEvent(key);
    else 
      fetchEvent();
  }
  

  return (
    <div className="App">
      <div className="title"><h3>EPL Schedule</h3></div>
      <div className="page">
        <div className="list-container">
          <h2 className="container-title">Upcoming Matches</h2>
          {events.map((e, i) => (
            <EventBox key={e.key} homeTeamLogo={e.homeLogo} home={e.home} awayTeamLogo={e.awayLogo} away={e.away} date={e.matchDate} />
          ))}
        </div>

        <div className="list-container">
          <h2 className="container-title">Favorites</h2>
           {teams.map((t, i) => (
            <TeamBox key={t.key} keyId={t.key} name={t.name} logo={t.logo} changeSchedule={changeSchedule}/>
          ))}
        
        </div>
      </div>
    </div>
  );
}



export default App;
