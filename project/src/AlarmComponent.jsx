import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

// const [alarm_razmetka] = useState(alarms);

// const handleDeleted = (id, event) => {

// };

export default function AlarmComponent() {

  const [alarms, setAlarm] = useState([]);

  const handleDelete = (e) => {
    fetch('http://localhost:3001/delal', {
      method: 'POST',
      body: JSON.stringify({id: e.target.id}),
      headers: {'Content-Type': 'application/json'}
    });
  };

  const alarm_razmetka = alarms.map((item) => {
    return (
      <div key={item.id}>
        <hr className="hr-line" />
        <h1 className="time">{item.time}</h1>
        <p className="day">{item.day}</p>
        <div class="cl-btn-6">
          <div class="cl-btn-6-in">
            <div id={item.id} onMouseDown={(e) => handleDelete(e)}  class="cl-btn-6-txt">Удалить</div>
          </div>
        </div>
        <hr className="hr-line" />
      </div>
    );
  });

  useEffect(() =>{ fetch('http://localhost:3001/alascr')
    .then(response => response.json())
    .then(function(response) {

      function padzero(num) {
        if (num < 10) { num = "0" + num; }
        else { num = num.toString(); }
        return num;
      }

      const set_alarms = () => {
        let al = [];
        for (const [key, value] of Object.entries(response)) {
          let d = new Date(value[0]);
          al.push({id: `${key}`, time: `${padzero(d.getHours())}:${padzero(d.getMinutes())}`
          , day: `${padzero(d.getDate())}.${padzero(d.getMonth()+1)}.${padzero(d.getFullYear())}`});
        }
        setAlarm(al);
        return <div>{alarm_razmetka}</div>;
      }

      set_alarms();

      })});
  
  return <div>{alarm_razmetka}</div>;
}
