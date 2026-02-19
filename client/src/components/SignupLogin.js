import React from 'react';

//회원가입 함수
export async function handleSignup(p){
    try{
        const res=await fetch("http://localhost:5000/signup", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email:p.email, password:p.password})});
        const data = await res.json();
        if(res.ok){alert(data.message);return}    //회원가입 성공
        else{alert(data.message);return}             //실패

            
            
    }catch(e){
        console.log(e);
        alert("서버오류 다시 시도하십시오");
    }
}
//로그인 함수
export async function handleLogin(p){
    try{
        const res = await fetch("http://localhost:5000/login", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email:p.email, password:p.password})}
        );
        const data= await res.json();
        
       if(res.ok){localStorage.setItem("token", data.token);{
        alert(data.message);
        return true;} }   //로그인 성공

        else{alert(data.message);return}        //실패
        
    }catch(e){console.log(e);
        alert("서버 오류 다시 시도하십시오")
    }
}