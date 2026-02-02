import logo from './logo.svg';
import './App.css';
import rabbit from "./토끼찡.gif"
import bear from "./곰돌찡.gif"
import 첼시_로고 from "./첼시 로고.png"
import 맨유_로고 from "./맨유 로고.png"
import 리버풀_로고 from "./리버풀 로고.png"
import 아스날_로고 from "./아스날 로고.png"
import 맨시티_로고 from "./맨시티 로고.png"
import 토트넘_로고 from "./토트넘 로고.png"
import 아스톤빌라_로고 from "./아스톤빌라 로고.png"
import EventBox from "./components/EventBox"
import { useState, useEffect } from 'react';
//apiKey= 6ca0ec92e2cd72c313fd9c129edf6836b89f497455dd1d454548501b8f7e12f0
//PL리그키-152 맨시티-80 리버풀-84 첼시-88 맨유-102 아스날-141 토트넘-164 av-3088

function App() {

  async function fetchTeam() {
    const response = await fetch("https://apiv3.apifootball.com/?action=get_events&from=2026-01-25&to=2026-02-25&league_id=152&APIkey=6ca0ec92e2cd72c313fd9c129edf6836b89f497455dd1d454548501b8f7e12f0");
    const jsonData = await response.json();
    console.log(jsonData);

  

    //console.log(jsonData.map(data=>data.match_hometeam_name)  );

  
  } 
  async function fetchEvent(){
    const response = await fetch("http://localhost:5000/api/event");
    const jsonData=await response.json();
    
    setEvents(jsonData);
    
  
  }


  const [teams, setTeams] = useState([
    { name: '첼시', logo: 첼시_로고, like: 0 },
    { name: '맨유', logo: 맨유_로고, like: 0 },
    { name: '리버풀', logo: 리버풀_로고, like: 0 },
    { name: '아스날', logo: 아스날_로고, like: 0 },
    { name: '맨시티', logo: 맨시티_로고, like: 0 },
    { name: '토트넘', logo: 토트넘_로고, like: 0 }
  ]);
  const createEmptyEvent=()=>({key:'', home:'', homeLogo:'', away:'', awayLogo:''})

  const [events, setEvents] = useState([])

  useEffect(() => {
    fetchEvent();
    //fetchTeam();
  }, []);
  

  // useEffect(() => {
  //   console.log("events 실제 값:", events);
  // }, [events]);
  


  function 토트넘보단av() {
    const copy = [...teams];
    copy[5] = { name: '아스톤빌라', logo: 아스톤빌라_로고, like: 0 };
    setTeams(copy);
  }
  function increaseLike(index) {
    const copy = [...teams];
    copy[index].like++;
    setTeams(copy);
  }



  return (
    <div className="App">
      <div className="black-nav"><h3>Fotmob</h3>
      </div>
      <div className="page">  
      
      {events.map((e, i)=>(
          <EventBox key= {e.key} homeTeamLogo={e.homeLogo} home={e.home} awayTeamLogo={e.awayLogo} away={e.away}/>
        ))}

      <div className = "list-container">
      {teams.map((team, i) => (
        <div className="list" key={i}>
          <h3>
            <img src={team.logo} className="로고" />
            {team.name}
            <button onClick={() => increaseLike(i)}>👍</button>
            {team.like}
          </h3>
          <p><button>{team.name} 일정 바로가기</button></p>

        </div>
      ))}
      </div>
      <img src={bear} alt="곰돌찡" className="곰돌찡"></img>
      </div>  

      
      <div>
        <button onClick={토트넘보단av}>토트넘보단 av인가?</button>
      </div>

    </div>);
}

export default App;
