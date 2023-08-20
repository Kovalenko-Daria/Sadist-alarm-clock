import React from "react";
import { useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

export default function Profile() {

  fetch('http://localhost:3001/profile')
  .then(response => response.json())
  .then(function(response){
    document.getElementById("name_user").innerHTML = response.name.toUpperCase();
    document.getElementById("aver_time").innerHTML = response.av_time;
    document.getElementById("count_answ").innerHTML = response.total_tasks;
    document.getElementById("right_per").innerHTML = response.right_tasks;
  })

  const check_time = (k, v) => {
    let time_test = new Date(v[0]);
    let now = new Date();
  if (time_test.getFullYear() == now.getFullYear() && time_test.getMonth() == now.getMonth() &&
  time_test.getDate() == now.getDate() && time_test.getHours() == now.getHours() &&
  time_test.getMinutes() == now.getMinutes()) {
    fetch('http://localhost:3001/whichala', {
      method: 'POST',
      body: JSON.stringify({id: k}),
      headers: {'Content-Type': 'application/json'}
    });
    window.location.replace("http://localhost:3000/zvonok");
    }
  }

const alarm = () => {
  fetch('http://localhost:3001/alascr')
  .then(response => response.json())
    .then(function(response) {
      for (const [key, value] of Object.entries(response)) {
        check_time(key, value);
      }
    });
  };

setInterval(alarm, 1000);

  return (
    <div className="body">
      <button className="but">
        <Link to="/alarms">
          <div class="arrow"></div>
        </Link>
      </button>
      <div className="profile">Профиль</div>
      <h2 className="name" id="name_user"></h2> 
      <h3 className="wordStatistic">Статистика</h3>
      <p className="statistic">Среднее затраченное время на все задания: </p> 
      <p className="statistic" id="aver_time"></p>
      <p className="statistic">Общее количество решенных задач: </p>
      <p className="statistic" id="count_answ"></p>
      <p className="statistic">Процент решенных задач:</p>
      <p className="statistic" id="right_per"></p>
      <button className="buttonExit">
        <Link className="r" to="/">
          Выйти из аккаунта
        </Link>
      </button>
    </div>
  );
}