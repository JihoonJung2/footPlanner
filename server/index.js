require("dotenv").config();
const pool =require("./db.js");
 const bcrypt = require('bcryptjs'); // Add this line
 const jwt = require('jsonwebtoken'); // Add this line

const express = require('express')
const app = express()
app.use(express.json());
var cors = require('cors')

app.use(cors())




app.get('/', (req, res) => {
  res.send('Hello Worldddddd')
})

//날짜
const today = new Date();

const fromDate = new Date(today);
const toDate = new Date(today);
const sixMonth=new Date(today);


toDate.setMonth(toDate.getMonth() + 1);
sixMonth.setMonth(sixMonth.getMonth()+6);

const formatDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const todayString = formatDate(fromDate);
const nextMonthString = formatDate(toDate);
const sixMonthString= formatDate(sixMonth);

console.log(todayString);
console.log(nextMonthString);

//회원가입
app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    // 이메일 중복 체크
    const [rows] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (rows.length > 0) {
      return res.status(409).json({ message: "중복된 이메일" });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 회원 저장
    await pool.query(
      "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
      [email, hashedPassword, "USER"]
    );

    res.status(201).json({ message: "회원가입 성공!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 에러(회원가입)" });
  }
});
//로그인
app.post('/login', async(req, res) =>
  { try 
    { const { email, password } = req.body;
      const [rows] = await pool.query("SELECT id, password, role FROM users WHERE email=?", [email]);
      if(rows.length==0)return res.status(409).json({message:"이메일 오류"});
      const user=rows[0];
      const isMatch=await bcrypt.compare(password, user.password);
      if(!isMatch){return res.status(409).json({message:"비밀번호 오류"})};
      const token=jwt.sign(
        {userId: user.id, role:user.role},process.env.JWT_SECRET,{expiresIn:"1h"}
      );
      res.json({message:"로그인 성공", token:token});
    } 
    catch(err) {
      console.error(err);
      res.status(500).json({message:"서버 에러(로그인)"});
     }
  }
);
//즐겨찾기 추가
app.post('/favorites', async (req, res) => {
  try {
    const { teamId } = req.body;

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "토큰 없음" });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "토큰 오류" });
    }

    const userId = decoded.userId;
    
    const [rows] = await pool.query(
      "SELECT id FROM favorite_team WHERE user_id=? AND favorite_team_id=?",
      [userId, teamId]
    );

    if (rows.length === 0) {
      await pool.query(
        "INSERT INTO favorite_team (user_id, favorite_team_id) VALUES (?, ?)",
        [userId, teamId]
      );
      return res.json({ message: "즐겨찾기에 추가되었습니다." });
    } else {
      return res.status(409).json({ message: "이미 추가된 팀입니다." });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 에러(즐겨찾기)" });
  }
});
//즐겨찾기 확인
app.get('/getfavorites', async(req, res)=>{
  try{
    const token=req.headers.authorization?.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
    return res.status(401).json({ message: "토큰 오류" });
    }
    userId=decoded.userId;
    const [rows]=await pool.query("SELECT favorite_team_id FROM favorite_team WHERE user_id=?",[userId]);
    const favoriteTeamIds = rows.map(r => r.favorite_team_id);
    res.json(favoriteTeamIds);
    
  }catch(e) {
    console.error(err);
    res.status(500).json({ message: "서버 에러(즐겨찾기)" });
  }
})
//한달 뒤까지 모든 일정 반환
app.get('/api/event/', async(req, res)=>{
  const response = await fetch("https://apiv3.apifootball.com/?action=get_events&from="+todayString+ "&to="+nextMonthString+"&league_id=152&APIkey="+process.env.APIkey);
  
  const jsonData = await response.json();
 

  
  res.json( jsonData.slice(0,20).map(d => ({
    key : d.match_id,
    home: d.match_hometeam_name,
    homeLogo: d.team_home_badge,
    away: d.match_awayteam_name,
    awayLogo: d.team_away_badge,
    matchDate : d.match_date,
    league : d.league_name
  })));
 
})
//여러개팀 일정
app.get('/api/teams', async (req, res) => {
  try {
    const teamIds = req.query.teamIds.split(",");
    
    const teamQuery = teamIds.map(id => `team_id=${id}`).join("&");
    const response = await fetch(
      `https://apiv3.apifootball.com/?action=get_events&from=${todayString}&to=${sixMonthString}&${teamQuery}&APIkey=${process.env.APIkey}`
    );

    const jsonData = await response.json();

   res.json( jsonData.slice(0,20).map(d => ({
    key : d.match_id,
    home: d.match_hometeam_name,
    homeLogo: d.team_home_badge,
    away: d.match_awayteam_name,
    awayLogo: d.team_away_badge,
    matchDate : d.match_date,
    league : d.league_name
  })));
    

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 에러" });
  }
});
//한달동안 특정 팀 이벤트 반환
app.get('/api/event/:teamKey', async(req, res)=>{
  const tk = req.params.teamKey; 
  const response = await fetch("https://apiv3.apifootball.com/?action=get_events&from="+todayString+ "&to="+sixMonthString+"&team_id="+tk+"&APIkey="+process.env.APIkey);
  const jsonData = await response.json();
  res.json( jsonData.slice(0,20).map(d => ({
    key : d.match_id,
    home: d.match_hometeam_name,
    homeLogo: d.team_home_badge,
    away: d.match_awayteam_name,
    awayLogo: d.team_away_badge,
    matchDate : d.match_date,
    league : d.league_name
  })));
 
})


//이번시즌 epl 20팀 반환
app.get('/api/eplTeams', async(req, res)=>{
  const response=await fetch("https://apiv3.apifootball.com/?action=get_teams&league_id=152&APIkey="+process.env.APIkey)
  const jsonData=await response.json();
  res.json(jsonData.map(d=>({
    key:d.team_key,
    name:d.team_name,
    logo:d.team_badge
  })))
  
})
//특정 팀 반환
app.get('/api/team', async(req, res)=>{
  const teamId = req.query.teamId
 
  const response=await fetch("https://apiv3.apifootball.com/?action=get_teams&team_id="+teamId+"&APIkey="+process.env.APIkey)
  const jsonData=await response.json();
  res.json(jsonData.map(d=>({
    key:d.team_key,
    name:d.team_name,
    logo:d.team_badge
  })))
  
})

// async function fetchTeam() {
//   const response = await fetch("https://apiv3.apifootball.com/?action=get_events&from=2026-01-25&to=2026-02-25&league_id=152&APIkey=6ca0ec92e2cd72c313fd9c129edf6836b89f497455dd1d454548501b8f7e12f0&team_id=88");
//   const jsonData = await response.json();
//   console.log(jsonData);



//   console.log(jsonData.map(data=>data.match_hometeam_name)  );


// } 

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000')
})