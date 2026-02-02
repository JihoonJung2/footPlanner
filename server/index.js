
const express = require('express')
const app = express()
var cors = require('cors')

app.use(cors())



app.get('/', (req, res) => {
  res.send('Hello Worldddddd')
})


const today = new Date();

const year = today.getFullYear();
const month = today.getMonth() + 1; // 0부터 시작
const day = today.getDate();

console.log(`${year}-${month}-${day}`);
// 2026-2-1


app.get('/api/event', async(req, res)=>{
  const response = await fetch("https://apiv3.apifootball.com/?action=get_events&from=2026-01-25&to=2026-02-25&league_id=152&APIkey=6ca0ec92e2cd72c313fd9c129edf6836b89f497455dd1d454548501b8f7e12f0");
  const jsonData = await response.json();
  res.json( jsonData.slice(0,10).map(d => ({
    key : d.match_id,
    home: d.match_hometeam_name,
    homeLogo: d.team_home_badge,
    away: d.match_awayteam_name,
    awayLogo: d.team_away_badge
  })));
})

async function fetchTeam() {
  const response = await fetch("https://apiv3.apifootball.com/?action=get_events&from=2026-01-25&to=2026-02-25&league_id=152&APIkey=6ca0ec92e2cd72c313fd9c129edf6836b89f497455dd1d454548501b8f7e12f0&team_id=88");
  const jsonData = await response.json();
  console.log(jsonData);



  console.log(jsonData.map(data=>data.match_hometeam_name)  );


} 

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000')
})