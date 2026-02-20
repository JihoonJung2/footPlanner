import './App.css';
import PL_LOGO from './premier-league-logo.jpg';

import {fetchEvent,fetchSpecificEvent, fetchTeam} from "./components/Fetch";
import EventBox from "./components/EventBox"
import TeamBox from "./components/TeamBox"
import SignupLoginModal from './components/SignupLoginModal'; 
import { useState, useEffect } from 'react';
import {AddFavorites, getFavorites} from './components/Favorites';
//2월 8일 api키 zxczmflxx3
function App() {
  //로그인, 회원가입 모달관리
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const openSignupModal = () => setShowSignupModal(true);
  const closeSignupModal = () => setShowSignupModal(false);

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);  
  
  //로그인 관리
  const [isLoggedIn, setIsLoggedIn]=useState(false);

  const handleLogout = () => {
    if(isLoggedIn)
    alert("로그아웃 되었습니다.");      
  else   
    alert("로그인이 되어있지않습니다.");  
  localStorage.removeItem("token");  
  setIsLoggedIn(false);  
     
};

  const [teams, setTeams] = useState([]);
  //key, name, logo
  const [events, setEvents] = useState([]);
  //key, home, homeLogo, away, awayLogo, matchDate
  const [favorites, setFavorates] = useState([]);

  const listFavorites= //

  useEffect(()=>{
    async function loadFunction(){            //fetch
      try{
         const eventData= await fetchEvent();
         const teamData= await fetchTeam();


         setEvents(eventData);
         setTeams(teamData);
      }catch(err){console.error(err);}
    }
    const token=localStorage.getItem("token");  //로그인 유무확인
    if(token) setIsLoggedIn(true);
    else setIsLoggedIn(false);
   

    loadFunction();
  },[]);

  useEffect(()=>{
    if(isLoggedIn)console.log("로그인o");
    else console.log("로그인x")
  },[isLoggedIn])

  async function changeSchedule(key){
    let data;
    if(key){data=await fetchSpecificEvent(key={key});}
    else{data=await fetchEvent();}
    setEvents(data);
  }
 
  return (
    <div className="App">
      <div className="auth-buttons"> {/* Container for signup/login buttons */}
        <button onClick={openSignupModal}>Signup</button>
        <button onClick={openLoginModal}>Login</button>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={getFavorites}>즐겨찾기 확인</button>
      </div>
      <div className="title"><img src={PL_LOGO} alt="PL LOGO" className="titleLogo" onClick={()=>changeSchedule()}></img><h3>EPL Schedule</h3></div>
      <div className="page">
        <div className="list-container">
          <h2 className="container-title">Upcoming Matches</h2>
          {events?.map((e, i) => (
            <EventBox key={e.key} homeTeamLogo={e.homeLogo} home={e.home} awayTeamLogo={e.awayLogo} away={e.away} date={e.matchDate} league={e.league}/>
          ))}
        </div>

        <div className="list-container">
          <h2 className="container-title">Teams</h2>
           {teams?.map((t, i) => (
            <TeamBox key={t.key} keyId={t.key} name={t.name} logo={t.logo} changeSchedule={changeSchedule} showModal={openLoginModal} isLoggedIn={isLoggedIn} addFavorites={() => AddFavorites(t.key)}/>
          ))}
        
        </div>
      </div>

      <SignupLoginModal show={showSignupModal} onClose={closeSignupModal} type="signup"  />
      <SignupLoginModal show={showLoginModal} onClose={closeLoginModal} type="login" setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}



export default App;
