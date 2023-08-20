import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AlarmComponent from "./AlarmComponent";
import "./App.css";

export default function Alarm() {

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
      <button className="iAmTired">
        <Link to="/profile">
          <p className="home">&#8962;</p>
        </Link>
      </button>
      <button className="but">
        <Link to="/setalarm">
          <div class="icon icon-plus"></div>
        </Link>
      </button>
      <h1 className="headingg">Ваши будильники:</h1>
      <div className="styleAlarmComponent">
        <AlarmComponent />
      </div>
    </div>
  );
}
