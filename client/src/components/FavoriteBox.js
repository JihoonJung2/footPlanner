import React, { useState, useEffect } from 'react';
import { getFavorites } from './Favorites';
import {fetchTeams} from "./Fetch";
import './FavoriteBox.css';


function FavoriteBox({ isLoggedIn, changeSchedule, setEvents}) {
  const [favoriteTeams, setFavoriteTeam] = useState([]); // 팀 정보 배열

  // getTeam 함수 밖으로 정의
  async function getTeam(favId) {
    const res = await fetch(`http://localhost:5000/api/team?teamId=${favId}`);
    const data = await res.json();
    return data[0]; // teamIds 하나씩 호출하면 data는 배열, 첫번째 팀 선택
  }

  useEffect(() => {
    if (!isLoggedIn) return; // 로그인 안하면 fetch하지 않음

    const fetchFavorites = async () => {
      try {
        const data = await getFavorites(); // ID 배열 받음
        
    

        // 각 ID에 대해 팀 정보 불러오기
        const teams = await Promise.all(data.map(fav => getTeam(fav)));
        setFavoriteTeam(teams);
      } catch (err) {
        console.error("즐겨찾기 로딩 실패", err);
      }
    };

    fetchFavorites();
  }, [isLoggedIn]);
  
if(isLoggedIn){
  
  return (
    <div className="favorite-box">
      <h3 onClick={async() => 
      { if (favoriteTeams.length === 0) return;
         const keys = favoriteTeams.map(team => team.key); 
        const data = await fetchTeams(keys);
        console.log(data);
        setEvents(data);}}>나의 즐겨찾기</h3>
      {favoriteTeams.length === 0? (
        <p>즐겨찾기가 없습니다.</p>
      ) : (
        <ul>
          {favoriteTeams.map((team, index) => (
            <li key={index}>
              <img onClick={()=>{changeSchedule(team.key)}} src={team.logo} alt={team.name} className="favorite-team-logo" />
              <span className="favorite-team-name">{team.name}</span>
              <button className="delete-fav-btn">삭제</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );}
  if (!isLoggedIn) return null;
}

export default FavoriteBox;