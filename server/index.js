
const express = require('express')
const app = express()
var cors = require('cors')

app.use(cors())
//key = 6ca0ec92e2cd72c313fd9c129edf6836b89f497455dd1d454548501b8f7e12f0


app.get('/', (req, res) => {
  res.send('Hello Worldddddd')
})


const today = new Date();

const fromDate = new Date(today);
const toDate = new Date(today);
const sixMonth=new Date(today);

// 다음달로 이동
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



app.get('/api/event/', async(req, res)=>{
  const response = await fetch("https://apiv3.apifootball.com/?action=get_events&from="+todayString+ "&to="+nextMonthString+"&league_id=152&APIkey=6ca0ec92e2cd72c313fd9c129edf6836b89f497455dd1d454548501b8f7e12f0");
  const jsonData = await response.json();
  res.json( jsonData.slice(0,20).map(d => ({
    key : d.match_id,
    home: d.match_hometeam_name,
    homeLogo: d.team_home_badge,
    away: d.match_awayteam_name,
    awayLogo: d.team_away_badge,
    matchDate : d.match_date
  })));
 
})
app.get('/api/event/:teamKey', async(req, res)=>{
  const tk = req.params.teamKey; 
  console.log(tk);
  const response = await fetch("https://apiv3.apifootball.com/?action=get_events&from="+todayString+ "&to="+sixMonthString+"&team_id="+tk+"&APIkey=6ca0ec92e2cd72c313fd9c129edf6836b89f497455dd1d454548501b8f7e12f0");
  const jsonData = await response.json();
  res.json( jsonData.slice(0,20).map(d => ({
    key : d.match_id,
    home: d.match_hometeam_name,
    homeLogo: d.team_home_badge,
    away: d.match_awayteam_name,
    awayLogo: d.team_away_badge,
    matchDate : d.match_date
  })));
 
})

app.get('/api/eplTeams', async(req, res)=>{
  const response=await fetch("https://apiv3.apifootball.com/?action=get_teams&league_id=152&APIkey=6ca0ec92e2cd72c313fd9c129edf6836b89f497455dd1d454548501b8f7e12f0")
  const jsonData=await response.json();
  res.json(jsonData.map(d=>({
    key:d.team_key,
    name:d.team_name,
    logo:d.team_badge
  })))
  console.log(jsonData);
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