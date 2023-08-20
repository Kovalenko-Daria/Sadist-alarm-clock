import Profile from "./Profile";
import Registr from "./Registr";
import Avtoriz from "./Avtoriz";
import Alarm from "./Alarm";
import Tasks from "./Tasks";
import Quote from "./Quote";
import SetAlarm from "./SetAlarm";
import AlarmComponent from "./AlarmComponent";
import Zvonok from "./Zvonok";

import React from "react";
import ReactDOM from "react-dom";
import { Routes, Route, Link } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <h1>Добро пожаловать в будильник-садист!</h1>
      <Routes>
        <Route path="/registr" element={<Registr />} />
        <Route path="/" element={<Avtoriz />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/alarms" element={<Alarm />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/alarmComponent" element={<AlarmComponent />} />
        <Route path="/setalarm" element={<SetAlarm />} />
        <Route path="/zvonok" element={<Zvonok />} />
      </Routes>
    </div>
  );
}

export default App;
