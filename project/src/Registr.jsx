import React, {useState, useEffect} from "react";
import { Routes, Route, Link, useNavigate} from "react-router-dom";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [loginDirty, setLoginDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  const [nameError, setNameError] = useState("Имя не может быть пустым");
  const [emailError, setEmailError] = useState("Email не может быть пустым");
  const [loginError, setLoginError] = useState("Логин не может быть пустым");
  const [passwordError, setPasswordError] = useState(
    "Пароль не может быть пустым"
  );

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (emailError || passwordError || loginError || nameError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError, loginError, nameError]);

  const nameHandler = (e) => {
    setName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 30) {
      setNameError("Имя должно быть длинне 2 и меньше 30");
      if (!e.target.value) {
        setNameError("Имя не может быть пустым");
      }
    } else {
      setNameError("");
    }
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Некорректный Email");
    } else {
      setEmailError("");
    }
  };

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
      case "name":
        setNameDirty(true);
        break;
      case "email":
        setEmailDirty(true);
        break;
      case "login":
        setLoginDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let state = { name: name,  email: email, login: login, password: password};

    fetch('http://localhost:3001/reg', {
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
          alert("Аккаунт с таким логином или почтой уже существует. \nВведите другие значения или перейдите в раздел авторизации");
        }
      });
};
  return (
    <div className="body">
      <div>
        <div className="heading">Будильник-садист</div>
        <h2 className="authorization">Регистрация</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => nameHandler(e)}
          onBlur={(e) => blurHandler(e)}
          name="name"
          className="inputstr"
          type="text"
          placeholder="Имя"
          value={name}
        />
        {nameDirty && nameError && (
          <div className="mistaike" style={{ color: "white" }}>
            {nameError}
          </div>
        )}
        <p></p>
        <input
          onChange={(e) => emailHandler(e)}
          onBlur={(e) => blurHandler(e)}
          name="email"
          className="inputstr"
          type="text"
          placeholder="Email"
          value={email}
        />
        {emailDirty && emailError && (
          <div className="mistaike" style={{ color: "white" }}>
            {emailError}
          </div>
        )}
        <p></p>
        <input
          onChange={(e) => loginHandler(e)}
          onBlur={(e) => blurHandler(e)}
          name="login"
          className="inputstr"
          type="text"
          placeholder="Логин"
          value={login}
        />
        {loginDirty && loginError && (
          <div className="mistaike" style={{ color: "white" }}>
            {loginError}
          </div>
        )}
        <p></p>
        <input
          onChange={(e) => passwordHandler(e)}
          onBlur={(e) => blurHandler(e)}
          name="password"
          className="inputstr"
          type="password"
          placeholder="Пароль"
          value={password}
        />
        {passwordDirty && passwordError && (
          <div className="mistaike" style={{ color: "white" }}>
            {passwordError}
          </div>
        )}
        <p></p>
        <button disabled={!formValid} className="buttonRegist">
          Зарегистрироваться
        </button>
        </form>
        <p></p>
        <div className="text">
          Вы уже зарегистрированны? <p className="rastoianie"></p>
          <Link to="/" className="link_regist">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}
export default App;
