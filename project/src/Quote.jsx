import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

export default function Profile() {

  fetch('http://localhost:3001/getsec')
    .then(response => response.json())
    .then(function (response) {
      console.log(response);
      document.getElementById('time').innerHTML = `Вы потратили ${response.time} секунд на решение задачи`;
      document.getElementById('quot').innerHTML = `${response.quote}`;
    });

  return (
    <div className="bodyTask">
      <div className="bodyTaskBlack">
        <div className="Ramka">
          <h1 className="stisticQuote" id='time'>
          </h1>
          <p className="line">_____________________________</p>
          <p className="Quote">Цитата дня:</p>

          <p className="Quote" id='quot'></p>

          <button className="buttonExit">
            <Link className="r" to="/alarms">
              Oк
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
