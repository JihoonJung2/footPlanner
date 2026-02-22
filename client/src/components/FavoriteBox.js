import {deleteFavorites} from "./Favorites";

import './FavoriteBox.css';


function FavoriteBox({ isLoggedIn, changeSchedule,  favoriteTeams, setFavoriteId}) {

  

if(isLoggedIn){
  
  return (
    <div className="favorite-box">
      <h3>나의 즐겨찾기</h3>
      {favoriteTeams.length === 0? (
        <p>즐겨찾기가 없습니다.</p>
      ) : (
        <ul>
          {favoriteTeams.map((team, index) => (
            <li key={index}>
              <img onClick={()=>{changeSchedule(team.key);}} src={team.logo} alt={team.name} className="favorite-team-logo" />
              <span className="favorite-team-name">{team.name}</span>
              <button onClick={()=>{
                setFavoriteId(prev=>prev.filter(id=>id!==team.key));
                deleteFavorites(team.key);
              }}className="delete-fav-btn">삭제</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );}
  if (!isLoggedIn) return null;
}

export default FavoriteBox;