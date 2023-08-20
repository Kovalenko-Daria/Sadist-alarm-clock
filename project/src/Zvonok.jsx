import {React, useEffect} from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

export default function Zvonok() {

  let sound = new Audio('https://ruo.morsmusic.org/load/892508633/The_Weeknd_-_Save_pressYour_Tears_(musmore.com).mp3');
let x = 0;

  const play_music = () => {
    fetch('http://localhost:3001/getmus')
    .then(response => response.json())
    .then(function(response) {
      if (x == 0) {
        sound = new Audio(`${response.calm}`);
        sound.play();
        x = 1;
      }
      else {
        console.log(x + 'now');
        sound.pause();
        sound = new Audio(`${response.rock}`);
        sound.play();
      }
    });
}

  play_music();

  setTimeout(play_music, 15000);

  const handleSolve = (e) => {
    e.preventDefault();
    window.location.href='http://localhost:3000/tasks';
  }

  function padzero (num) {
    if (num < 10) { num = "0" + num; }
    else { num = num.toString(); }
    return num;
  }

  fetch('http://localhost:3001/time')
  .then(response => response.json())
  .then(function (response) {
    document.getElementById('time').innerHTML=`${response.time}`;
  });

  

  return (
    <div className="bodyTask">
      <div className="bodyTaskBlack">
        <div className="timeOnZvonok" id='time'></div>
          <div className="headingZvonok">Будильник</div>
          <button className="buttonZvonok" onClick= {(e) => handleSolve(e)}>
              Решить задачу
          </button>
      </div>
    </div>
  );
}
