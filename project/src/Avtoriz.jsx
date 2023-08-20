import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

export default function Avtoriz() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [loginDirty, setLoginDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  const [loginError, setLoginError] = useState("Логин не может быть пустым");
  const [passwordError, setPasswordError] = useState(
    "Пароль не может быть пустым"
  );

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (passwordError || loginError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [passwordError, loginError]);

  const loginHandler = (e) => {
    setLogin(e.target.value);
    if (e.target.value.length < 5 || e.target.value.length > 20) {
      setLoginError("Логин должен быть длиннее 5 и меньше 20");
      if (!e.target.value) {
        setLoginError("Логин не может быть пустым");
      }
    } else {
      setLoginError("");
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 20) {
      setPasswordError("Пароль должен быть длиннее 3 и меньше 20");
      if (!e.target.value) {
        setPasswordError("Пароль не может быть пустым");
      }
    } else {
      setPasswordError("");
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "login":
        setLoginDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    let state = {login: login, password: password};

    fetch('http://localhost:3001/avtoriz', {
        method: 'POST',
        body: JSON.stringify(state),
        headers: {'Content-Type': 'application/json'}
      }).then(function(response) {
        return response.json();
      }).catch(err => console.log(err))
      .then(response => {
        if (response.answer) {
          window.location.href = "http://localhost:3000/alarms";
        }
        else {
          alert("Неверный логин или пароль. Попробуйте еще раз");
        }
      });
 
    event.preventDefault();
  }


  return (
    <div className="body">
      <div className="heading">Будильник-садист</div>
      <h2 className="authorization">Авторизация</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
      <input
        onChange={(e) => loginHandler(e)}
        onBlur={blurHandler}
        name="login"
        className="inputstr"
        type="text"
        placeholder="Логин"
      />
      {loginDirty && loginError && (
        <div className="mistaike" style={{ color: "white" }}>
          {loginError}
        </div>
      )}
      <p></p>
      <input
        onChange={(e) => passwordHandler(e)}
        onBlur={blurHandler}
        name="password"
        className="inputstr"
        type="password"
        placeholder="Пароль"
      />
      {passwordDirty && passwordError && (
        <div className="mistaike" style={{ color: "white" }}>
          {passwordError}
        </div>
      )}
      <p></p>
      <button className="buttonLogIn" disabled={!formValid}>
        Войти
      </button>
      </form>
      <p></p>
      <div className="text">
        Вы не зарегистрированы? <p className="rastoianie"></p>
        <Link to="/registr" className="link_regist">
          Зарегестрироваться
        </Link>
      </div>
    </div>
  );
}
