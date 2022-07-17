import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
let owl = require("../images/owl1.png");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [username, setUsername] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:8000/api/users/login`,
        { 
          // username: username,
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res, "res");
        console.log(res.data, "res data");
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrMsg(err.response.data.message);
      });
  };

  return (
    <div>
      <div className="secondaryheader">
        <h1>Grab a cup of tea and find your next book!</h1>
        <div>
          <button className="btn">
            <Link to="/Home">Home</Link>
          </button>
          <button className="btn">
            <Link to="/addbook">Add</Link>
          </button>
        </div>
      </div>
      <div>
        <img src={owl} className="owl" alt="owl" />
      </div>
      <h1 className="header1">Log in Here:</h1>
      <form onSubmit={login} className="loginform">
        <div className="login">
          <label>Email: </label>
          <br></br>
          <input
            name="text"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <p>{errMsg ? errMsg : ""}</p>
        <div className="login">
          <label>Password: </label>
          <br></br>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" className="loginbtn" value="Log In" />
        <h2>Not Registered Yet?</h2>
        <button className="loginbtn">
          <Link to="/register">Register here!</Link>
        </button>
      </form>
    </div>
  );
};
export default Login;
