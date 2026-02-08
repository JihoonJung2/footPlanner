import './App.css';
import PL_LOGO from './premier-league-logo.jpg';

import {fetchEvent,fetchSpecificEvent, fetchTeam} from "./components/Fetch";
import EventBox from "./components/EventBox"
import TeamBox from "./components/TeamBox"
import { useState, useEffect } from 'react';

function App() {

  
  // }

  const [teams, setTeams] = useState([]);
  //key, name, logo
  const [events, setEvents] = useState([]);
  //key, home, homeLogo, away, awayLogo, matchDate



  useEffect(()=>{
    async function loadFunction(){
      try{
         const eventData= await fetchEvent();
         const teamData= await fetchTeam();


         setEvents(eventData);
         setTeams(teamData);
      }catch(err){console.error(err);}
    }
    
    loadFunction();
  },[]);

  async function changeSchedule(key){
    let data;
    if(key){data=await fetchSpecificEvent(key={key});}
    else{data=await fetchEvent();}
    setEvents(data);
  }
 

  return (
    <div className="App">
      <div className="title"><img src={PL_LOGO} alt="PL LOGO" className="titleLogo" onClick={()=>changeSchedule()}></img><h3>EPL Schedule</h3></div>
      <div className="page">
        <div className="list-container">
          <h2 className="container-title">Upcoming Matches</h2>
          {events?.map((e, i) => (
            <EventBox key={e.key} homeTeamLogo={e.homeLogo} home={e.home} awayTeamLogo={e.awayLogo} away={e.away} date={e.matchDate} league={e.league}/>
          ))}
        </div>

        <div className="list-container">
          <h2 className="container-title">Favorites</h2>
           {teams?.map((t, i) => (
            <TeamBox key={t.key} keyId={t.key} name={t.name} logo={t.logo} changeSchedule={changeSchedule}/>
          ))}
        
        </div>
      </div>
    </div>
  );
}



export default App;
