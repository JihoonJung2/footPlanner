
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
  export async function fetchSpecificEvent(p) {
    try {
      const response = await fetch(`http://localhost:5000/api/event/${p.key}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      return(jsonData);
    } catch (error) {
      console.error("Failed to fetch events:", error);return null;
    
    }
  }
  
  export async function fetchTeam(){
    try{
      const response=await fetch("http://localhost:5000/api/eplTeams")
        if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Failed to fetch team:", error);
    }
  }

 export async function fetchTeams(teamIds) {
  try {
   
    const query = teamIds.join(','); 
    
    const response = await fetch(`http://localhost:5000/api/teams?teamIds=${query}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const jsonData = await response.json();
    return jsonData;
    
  } catch (error) {
    console.error("Failed to fetch teams:", error);
  }
}
  