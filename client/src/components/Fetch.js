
import React from "react"

export async function fetchEvent() {
    try {
      const response = await fetch("http://localhost:5000/api/event");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      return jsonData;
      
    } catch (error) {
      console.error("Failed to fetch events:", error); return null;
    }
  }
  export async function fetchSpecificEvent(key) {
    try {
      const response = await fetch(`http://localhost:5000/api/event/${key}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      return(jsonData);
    } catch (error) {
      console.error("Failed to fetch events:", error);return null;
    
    }
  }
  export async function fetchSpecificLeagueEvent(key) {
    try {
      const response = await fetch(`http://localhost:5000/api/leagueEvent/${key}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      
      return(jsonData);
    } catch (error) {
      console.error("Failed to fetch events:", error);return null;
    
    }
  }
  
  // export async function fetchTeam(){
  //   try{
  //     const response=await fetch("http://localhost:5000/api/eplTeams")
  //       if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const jsonData = await response.json();
  //     return jsonData;
  //   } catch (error) {
  //     console.error("Failed to fetch team:", error);
  //   }
  // }
  export async function fetchTeams(leagueId){
    try{
      const response=await fetch(`http://localhost:5000/api/teams/${leagueId}`)
        if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      
      return jsonData;
    
    } catch (error) {
      console.error("Failed to fetch team:", error);
    }
  }

export async function getTeam(favId) {
  try {
    const res = await fetch(
      `http://localhost:5000/api/team?teamId=${favId}`
    );
    const data = await res.json();

    if (!data || data.length === 0) {
      console.log("팀 없음:", favId);
      return null;
    }

    return data[0];
  } catch (e) {
    console.log(e);
    return null;
  }
}


//  export async function fetchTeams(teamIds) {
//   try {
   
//     const query = teamIds.join(','); 
    
//     const response = await fetch(`http://localhost:5000/api/teams?teamIds=${query}`);
    
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
    
//     const jsonData = await response.json();
//     return jsonData;
    
//   } catch (error) {
//     console.error("Failed to fetch teams:", error);
//   }
// }
  