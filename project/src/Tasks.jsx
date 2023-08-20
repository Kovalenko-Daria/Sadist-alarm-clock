import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useEffectOnce } from 'usehooks-ts'
import "./App.css";

export default function Profile() {

  let sound = new Audio('https://ruo.morsmusic.org/load/892508633/The_Weeknd_-_Save_pressYour_Tears_(musmore.com).mp3');
let x = 0;

  const play_music = () => {
    fetch('http://localhost:3001/getmus')
    .then(response => response.json())
    .then(function(response) {
      if (x == 0) {
        console.log('!!!!!' + response.calm);
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

  let corr = [];

  const handleSolve = (e) => {
    console.log(corr[parseInt(e.target.id)], corr, e.target.id);
    if (corr[parseInt(e.target.id)]) {
      fetch('http://localhost:3001/infotask', {
      method: 'POST',
      body: JSON.stringify({correct: 1}),
      headers: {'Content-Type': 'application/json'}
    });
    window.location.href='http://localhost:3000/quote';
    }
    else {
      fetch('http://localhost:3001/infotask', {
      method: 'POST',
      body: JSON.stringify({correct: 0}),
      headers: {'Content-Type': 'application/json'}
    });
      fetch('http://localhost:3001/alatask')
    .then(response => response.json())
    .then(function (response) {
    document.getElementById('task').innerHTML = `${response.task}`;
    document.getElementById('0').innerHTML = `${response.ans1[0]}`;
    document.getElementById('1').innerHTML = `${response.ans2[0]}`;
    document.getElementById('2').innerHTML = `${response.ans3[0]}`;
    document.getElementById('3').innerHTML = `${response.ans4[0]}`;
    corr = [];
    corr.push(response.ans1[1]);
    corr.push(response.ans2[1]);
    corr.push(response.ans3[1]);
    corr.push(response.ans4[1]);
      console.log(corr);
    });
    }
  }


    fetch('http://localhost:3001/alatask')
    .then(response => response.json())
    .then(function (response) {
    document.getElementById('task').innerHTML = `${response.task}`;
    document.getElementById('0').innerHTML = `${response.ans1[0]}`;
    document.getElementById('1').innerHTML = `${response.ans2[0]}`;
    document.getElementById('2').innerHTML = `${response.ans3[0]}`;
    document.getElementById('3').innerHTML = `${response.ans4[0]}`;
    corr.push(response.ans1[1]);
    corr.push(response.ans2[1]);
    corr.push(response.ans3[1]);
    corr.push(response.ans4[1]);
      console.log(response);
    });


  return (
    <div className="bodyTask">
      <div className="bodyTaskBlack">
        <div className="Ramka">
          <h1 className="heading">Выберите ответ</h1>
          <p className="task" id='task'></p>
          <p></p>
          <button className="FirstBut" onClick= {(e) => handleSolve(e)} id='0'></button>
          <p></p>
          <button className="SecondBut" onClick= {(e) => handleSolve(e)} id='1'></button>
          <p></p>
          <button className="ThirdBut" onClick= {(e) => handleSolve(e)} id='2'></button>
          <p></p>
          <button className="ForthBut"onClick= {(e) => handleSolve(e)} id='3'></button>
        </div>
      </div>
      </div>
  );
}
