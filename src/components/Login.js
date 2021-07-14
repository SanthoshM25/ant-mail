import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userDetails, setUserDetails] = useState({
    userName: "",
    password: "",
  });
  const pageHistory = useHistory();

  const loginSubmitHandler = () => {
    setUserDetails({ userName: userName, password: password });
    axios
      .post("http://localhost:3001/login/auth", userDetails)
      .then((res) => {
        if (res.data === "incorrect password") {
          alert("Incorrect password");
        } else if (res.data === "account not found") {
          alert("Account not found");
        } else {
          console.log(res.data);
          pageHistory.push("/home/" + res.data.email);
        }
      })
      .catch((err) => {
        console.log("login: something went wrong");
        alert("Something went wrong");
      });
  };
  return (
    <div className="login-body" id="login">
      <div className="container">
        <div className="login-text">LOGIN</div>
        <div className="row">
          <input
            className="userName-input"
            placeholder="User Name"
            type="text"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div className="row">
          <input
            className="password-input"
            placeholder="Password"
            type="text"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="row">
          <input
            onClick={() => {
              loginSubmitHandler();
            }}
            type="button"
            className="submit-button"
            value="submit"
          />
        </div>
        <div className="new-user">
          <p>New User?</p>
          <Link to="/signup">create account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
