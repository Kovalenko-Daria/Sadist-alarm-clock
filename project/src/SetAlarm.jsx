import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ElogDateTime from "./ElogDateTime";
import "./App.css";

export default function DateTimePage() {

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


  const [myDate, setMyDate] = useState(null);
  let id = 0;
  let mus_data = {};
  let type = {'Математическая': 'math', 'Логическая' : 'logic'};
  let level = {'Легко': 'easy', 'Сложно' : 'hard'};

    const makeList = (dict) => {
      let html = '';
      html += '<option>рандомная мелодия</option>';
      mus_data['рандомная мелодия'] = 0;
      for (const [key, value] of Object.entries(dict)) {
        if (key != 'рандомная мелодия') {
          html += `<option>${key}</option>`
        }
      }
      document.getElementById('music_elem').innerHTML = html;
    }

    useEffect(() => {
      fetch('http://localhost:3001/alarmus')
      .then(response => response.json())
      .then(function(response) {
        mus_data = response;
        makeList(response);
        });

        fetch('http://localhost:3001/alascr')
        .then(response => response.json())
        .then(function(response) {
          id = response.id;
          });
    });

    const handleAdd = (e) => {
      e.preventDefault();
      if (myDate != null && myDate.substr(0, 10) != '0000-00-00'){
      let data = {time_start: myDate, user_iduser: id, 
        music: mus_data[document.getElementById('music_elem').value],
        level: level[document.getElementById('lev').value],
        type: type[document.getElementById('typ').value]};

      fetch('http://localhost:3001/newal', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
      }).then(function(response) {
        window.location.href = "http://localhost:3000/alarms";
      }).catch(err => console.log(err));}
      else {
        alert("Добавьте дату и время");
      }
    };

  return (
    <div className="body">
      <>
        <p className="headingOnSetALarm">Будильник</p>
        <label className="textOnSetALarm">Введите время:</label>
        <p></p>
        <form onSubmit={(e) => handleAdd(e)}>
        <ElogDateTime
          handleChange={(val) => {
            setMyDate(val);
          }}
        />
        {/*<small>
          <i className="textOnSetALarm">Date you set: {myDate}</i>
        </small>*/}
        <br />
        <label className="textOnSetALarm">
          Тип задачи:
          <br />
          <select id = 'typ' className="ElogDateTime">
            <option> Математическая </option>
            <option> Логическая </option>
          </select>
        </label>
        <br />
        <label className="textOnSetALarm">
          Сложность:
          <br />
          <select id = 'lev' className="ElogDateTime">
            <option> Легко </option>
            <option> Сложно </option>
          </select>
        </label>
        <br />
        <label className="textOnSetALarm">
          Выберите мелодию:
          <br />
          <select id='music_elem' className="ElogDateTime">
          </select>
        </label>
        <br />
        <button className="saveSetAlarm" to="/alarms">
            Сохранить
        </button>
        </form>
        <button className="exitSetAlarm" >
          <Link className="r" to="/alarms">
            Отменить
          </Link>
        </button>
      </>
    </div>
  );
}
