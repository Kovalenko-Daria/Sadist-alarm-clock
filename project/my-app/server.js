const mysql = require("mysql");
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");

const PORT = process.env.PORT || 3001;

let id_client = 1;

let id_bud = 0;

let id_task = 0;

let mode_sol = 0;

function padzero (num) {
  if (num < 10) { num = "0" + num; }
  else { num = num.toString(); }
  return num;
}

const app = express();
 
app.use(cors());
// parse application/json
app.use(bodyParser.json());
  
//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydb'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
 
 
//add new user
app.post('/reg',(req, res) => {
  let data = {user_name: req.body.name, email: req.body.email, login: req.body.login, password: req.body.password};
  conn.query(`SELECT email, login FROM user`, (err, result) => {
    let i = 0;
    let has_reg = 0;
    while (i<Object.keys(result).length) {
      if(req.body.email == result[i].email || req.body.login == result[i].login) {
        has_reg = 1;
      }
      i++;
    }

    if (has_reg == 1) {
      res.send({answer: 0});
    }
    else {
      let sql = "INSERT INTO user SET ?";
      let query = conn.query(sql, data, (err, results) => {
        if(err) throw err;
      });
      let n_q = conn.query(`SELECT iduser FROM user WHERE login='${data.login}'`, (err, results) => {
        id_client = results[0].iduser;
      });
      res.send({answer: 1});
    }
  })
});

app.get('/profile', (req, res) => {

  const sql =`SELECT user_name, AVG(time_end - time_start) AS av_time, SUM(correct_answ) AS right_ans, COUNT(correct_answ) AS count_ans  FROM 
              user LEFT JOIN alarm ON iduser=user_iduser
                   LEFT JOIN m2m_alarm_task ON alarm_idalarm=idalarm
              WHERE iduser = ${id_client} AND time_end IS NOT NULL
              GROUP BY iduser`
    
  conn.query(sql, (err, result) => {
    if(err) console.log(err);
    if(result.length==0) {
      const sql =`SELECT user_name FROM user
              WHERE iduser = ${id_client}`
      conn.query(sql, (err, result1) => {
        res.json({"name": result1[0].user_name, "av_time": 0, "total_tasks": 0, "right_tasks": 0});
      });
    }
    else {res.json({"name": result[0].user_name, "av_time": result[0].av_time, "total_tasks": result[0].count_ans, "right_tasks": result[0].right_ans/result[0].count_ans*100})};
  })
});


//checking data for auth
app.post('/avtoriz', (req, res) => {
  let data = {login: req.body.login, password: req.body.password};
  conn.query(`SELECT login, password FROM user`, (err, result) => {
    
    let i = 0;
    let has_acc = 0;

    while (i<Object.keys(result).length) {
      if(req.body.password == result[i].password && req.body.login == result[i].login) {
        has_acc = 1;
      }
      i++;
    }
    if (has_acc) {
      let n_q = conn.query(`SELECT iduser FROM user WHERE login='${data.login}'`, (err, results) => {
        id_client = results[0].iduser;
      });
      res.send({answer: 1});
    }
    else {
      res.send({answer: 0});
    }
  })
});


app.get('/alascr', (req, res) => {
  let n_q = conn.query(`SELECT * FROM alarm WHERE user_iduser='${id_client}'`, (err, results) => {
    let alarms = {};
    var tod = new Date();
    for (const el of results) {
      if (el.time_start - tod >= -1000) {
        alarms[`${el.idalarm}`] = [`${el.time_start}`, el.motivational_phrase_idphrase, el.task_type, el.task_level];
      }
    }
    res.json(alarms); 
  });
});

app.get('/alarmus', (req, res) => {
  let mus = {};
  let n_q = conn.query(`SELECT idmusic, music_name FROM music WHERE type='calm'`, (err, results) => {
    for (const el of results) {
      mus[`${el.music_name}`] = el.idmusic;
    }
    res.json(mus);
  });
});

app.post('/newal',(req, res) => { 
  let mot = Math.floor(Math.random() * 7) + 1;
    let sql = `INSERT INTO alarm (time_start, user_iduser, motivational_phrase_idphrase, task_level, task_type) VALUES('${req.body.time_start}', ${id_client}, ${mot}, '${req.body.level}', '${req.body.type}')`;
      let query = conn.query(sql, (err, results) => {
        let data_m2m = {}
        if (req.body.music == 0) {
          let ind = Math.floor(Math.random() * (17)) + 1;
          data_m2m = {alarm_idalarm: results.insertId, music_idmusic: ind};
        }
        else {
          data_m2m = {alarm_idalarm: results.insertId, music_idmusic: req.body.music};
        }
  let sql2 = "INSERT INTO m2m_alarm_music SET ?";
      let query2 = conn.query(sql2, data_m2m, (err, results) => {
        if(err) throw err;
      });
  let kish = Math.floor(Math.random() * (26 - 18 + 1)) + 18;
  let data_m2m_ = {alarm_idalarm: results.insertId, music_idmusic: kish};
  let sql3 = "INSERT INTO m2m_alarm_music SET ?";
      let query3 = conn.query(sql2, data_m2m_, (err, results) => {
        if(err) throw err;
      });
        if(err) throw err;
      });

  res.send({answer: 'Success'});
});

app.post('/delal',(req, res) => {
  let sq = `DELETE FROM m2m_alarm_music WHERE alarm_idalarm=${req.body.id}`;
  let query1 = conn.query(sq, (err, results) => {
    if(err) throw err;
  });
  let sql = `DELETE FROM alarm WHERE idalarm=${req.body.id}`;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
  });
});

app.post('/whichala',(req, res) => {
  id_bud = req.body.id;
});

app.get('/alatask', (req, res) => {
  let n_q = conn.query(`SELECT task_level, task_type FROM alarm WHERE idalarm=${id_bud}`, (err, results) => {
    let lev = results[0].task_level;
    let typ = results[0].task_type;
    let q = conn.query(`SELECT idtask, task FROM task WHERE level='${lev}' AND type='${typ}'`, (err, results) => {
      let tasks = [];
      for (const el of results) {
        let elem = {};
        elem[`${el.idtask}`] =`${el.task}`;
        tasks.push(elem);
      }
    let am = tasks.length;
    let r = Math.floor(Math.random() * (am));
    let ind = Object.keys(tasks[r])[0];
    id_task = ind;
    let y = conn.query(`SELECT answer, correctness FROM answer WHERE task_idtask=${ind}`, (err, result) => {
      res.json({task: tasks[r][ind], 
        ans1: [result[0].answer, result[0].correctness], 
        ans2: [result[1].answer, result[1].correctness], 
        ans3: [result[2].answer, result[2].correctness], 
        ans4: [result[3].answer, result[3].correctness]});
    })
    })
    
  });
});

app.get('/getmus', (req, res) => {
  let n_q = conn.query(`SELECT music_url FROM music JOIN m2m_alarm_music ON idmusic=music_idmusic WHERE alarm_idalarm=${id_bud}`, (err, results) => {
    res.json({calm: results[0].music_url, rock: results[1].music_url});
  });
});

app.get('/getsec', (req, res) => {
  let now = new Date();
  let q = conn.query(`SELECT phrase, time_start FROM motivational_phrase JOIN alarm on idphrase=motivational_phrase_idphrase WHERE idalarm=${id_bud}`, (err, results) => {
    let qu = results[0].phrase;
    let ts = results[0].time_start;
    res.json({time: Math.floor((now-ts)/1000), quote: `${qu}`});
  });
  let t = `${now.getFullYear()}-${padzero(now.getMonth()+1)}-${padzero(now.getDate())} ${padzero(now.getHours())}:${padzero(now.getMinutes())}:${padzero(now.getSeconds())}`;

  let q1 = conn.query(`UPDATE alarm SET time_end='${t}' WHERE idalarm=${id_bud}`, (err, results) => {});
});

app.post('/infotask', (req, res) => {
  let q1 = conn.query(`INSERT INTO m2m_alarm_task (alarm_idalarm, task_idtask, correct_answ) VALUES (${id_bud}, ${id_task}, ${req.body.correct})`, (err, results) => {});
});

app.get('/time', (req, res) => {
  let now = new Date();
  res.json({time: `${padzero(now.getHours())}:${padzero(now.getMinutes())}`});
});

app.listen(PORT, () => {
  console.log(`Server running successfully on ${PORT}`);
});

