import React from "react"

export async function AddFavorites(teamId){
    
    try{
        const res = await fetch("http://localhost:5000/favorites",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ teamId:teamId })
        })

        const data = await res.json();
       
        alert(data.message);

        return res.ok;   

    }catch(e){
        console.log(e);
        alert("서버오류");
        return false;
    }
}
export async function getFavorites(){
    try{
        const res=await fetch("http://localhost:5000/getfavorites",{
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        })
        const data = await res.json();
      
        return data;

    }catch(e){console.log(e);alert("서버에러");return false;}
}
export async function deleteFavorites(teamId){
    try{
        const res=await fetch("http://localhost:5000/favorites/delete",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`},
            body:JSON.stringify({teamId : teamId})
        })
        const data=await res.json();
        alert(data.message);
        return res.ok;

    }catch(e){console.log(e);alert("서버에러");return false;}
}