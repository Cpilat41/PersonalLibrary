import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
let owl = require("../images/owl1.png");

const Register = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errMsg, setErrMsg] = useState("");
  const [confirmReg, setConfirmReg] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onSubmitHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const register = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/users/register", user, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUser({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setConfirmReg("You are now registered! Now you can log in!");
        setErrors({});
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);
      });
  };
  return (
    <div>
      <div className="secondaryheader">
        <h2>Grab a cup of tea and find your next book</h2>
        <div>
          <button className="btn">
            <Link to="/Home">Home</Link>
          </button>
          <button className="btn">
            <Link to="/login">Log in</Link>
          </button>
        </div>
      </div>

      <div>
        <img src={owl} className="owl" alt="owl" />
        <h1 className="header1">Register Below</h1>
      </div>
      <div className="reg-row">
        <form onSubmit={register}>
          <div>
            <label>Username:</label>
            <br></br>
            <input
              name="username"
              type="text"
              value={user.username}
              onChange={(e) => onSubmitHandler(e)}
            />
          </div>
          <div>
            <label>Email:</label>
            <br></br>
            <input
              name="email"
              type="email"
              value={user.email}
              onChange={(e) => onSubmitHandler(e)}
            />
          </div>
          <div>
            <label>Password:</label>
            <br></br>
            <input
              name="password"
              type="password"
              value={user.password}
              onChange={(e) => onSubmitHandler(e)}
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <br></br>
            <input
              name="confirmPassword"
              type="password"
              value={user.confirmPassword}
              onChange={(e) => onSubmitHandler(e)}
            />
          </div>
          <button className="regbtn">Register Now!</button>
          <h2>Already Registered?</h2>
          <button className="regbtn"><Link to="/">Log In Here!</Link></button>
        </form>
      </div>
    </div>
  );
};
export default Register;
