import './App.css';
import PL_LOGO from './premier-league-logo.jpg';  //152
import BUN_LOGO from './분데스리가.png'; //175
import LALIGA_LOGO from './라리가.png'; //302
import SERIA_LOGO from './세리에.png';  //207

import {fetchEvent,fetchSpecificEvent, fetchSpecificLeagueEvent, fetchTeams, getTeam} from "./components/Fetch";
import EventBox from "./components/EventBox"
import TeamBox from "./components/TeamBox"
import SignupLoginModal from './components/SignupLoginModal'; 
import { useState, useEffect } from 'react';
import {AddFavorites, getFavorites } from './components/Favorites';
import FavoriteBox from './components/FavoriteBox';

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
  const [leagueId, setLeagueId]=useState(152);
  const [favoriteId,setFavoriteId]=useState([]);
  const [favoriteTeams, setFavoriteTeam] = useState([]); 
   
  useEffect(()=>{
    try{
    const loadTeams=async ()=>{
    const teamData=await fetchTeams(leagueId);
    setTeams(teamData);}
     loadTeams();}
    catch(e){console.error(e)}
  },[leagueId]);

  useEffect(()=>{
    async function loadFunction(){            //fetch
      try{
         const eventData= await fetchEvent();
         const teamData= await fetchTeams(leagueId);

        console.log(teamData);
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

  async function changeSchedule(key){ //팀만 바뀔때
    let data;
    if(key){data=await fetchSpecificEvent(key);}
    else{data=await fetchEvent();}
    setEvents(data);
  }
 async function changeLeague(key){
  const eventData=await fetchSpecificLeagueEvent(key);
  const teamData=await fetchTeams(key);
  setEvents(eventData);
  setTeams(teamData);
  
}
useEffect(() => {
    if (!isLoggedIn) return; 

    const fetchFavorites = async () => {
      try {
        const data = await getFavorites(); 
        const teams = await Promise.all(data.map(fav => getTeam(fav)));
        setFavoriteTeam(teams);
        
      } catch (err) {
        console.error("즐겨찾기 로딩 실패", err);
      }
    };

    fetchFavorites();
  }, [isLoggedIn, favoriteId]);
  return (
    <div className="App">
      <div className="auth-buttons"> 
        <button onClick={openSignupModal}>Signup</button>
        <button onClick={openLoginModal}>Login</button>
        <button onClick={handleLogout}>Logout</button>
      
      </div>
      <FavoriteBox isLoggedIn={isLoggedIn} changeSchedule={changeSchedule} favoriteTeams={favoriteTeams} setFavoriteId={setFavoriteId}/>
      <div className="title"><img src={PL_LOGO} alt="LOGO" className="titleLogo" onClick={()=>changeLeague(152)}></img>
      <img src={BUN_LOGO} alt="LOGO" className="titleLogo" onClick={()=>changeLeague(175)}></img>
      <img src={SERIA_LOGO} alt="LOGO" className="titleLogo" onClick={()=>changeLeague(207)}></img>
      <img src={LALIGA_LOGO} alt="LOGO" className="titleLogo" onClick={()=>changeLeague(302)}></img></div>
      
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
            <TeamBox key={t.key} keyId={t.key} name={t.name} logo={t.logo} changeSchedule={changeSchedule} showModal={openLoginModal} isLoggedIn={isLoggedIn} addFavorites={() => AddFavorites(t.key)} setFavoriteId={setFavoriteId} winningPoint={t.winningPoint} ranking={t.ranking}/>
          ))}
        
        </div>
      </div>

      <SignupLoginModal show={showSignupModal} onClose={closeSignupModal} type="signup"  />
      <SignupLoginModal show={showLoginModal} onClose={closeLoginModal} type="login" setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}



export default App;
