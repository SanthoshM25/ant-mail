import React from "react";
import axios from "axios";
import { useState } from "react";

function Test() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [details, setDetails] = useState({
    to: [""],
    cc: "",
    sub: "",
    scheduleSelector: "",
    mailBody: "",
    createdAt: "",
    sentAt: "",
  });
  const [history, setHistory] = useState([{}]);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleHistory = (e) => {
    setHistory(...history, details);
  };

  const submitHandler = async () => {
    await axios.post("http://localhost:3001/posts/newmail", {
      email: email,
      password: password,
      userName: userName,
      history: history,
    });
  };
  return (
    <div className="test-body">
      <div className="test-container">
        <div className="row">
          <input
            className="test-email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            type="email"
          />
        </div>

        <div className="row">
          <input
            className="test-password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            type="password"
          />
        </div>

        <div className="row">
          <input
            className="test-name"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            placeholder="name"
            type="text"
          />
        </div>
      </div>
      <div className="row">
        <form className="container" onSubmit={handleHistory}>
          <input
            className="test-to"
            onChange={handleChange}
            placeholder="to"
            type="email"
          />
          <input
            className="test-cc"
            onChange={handleChange}
            placeholder="cc"
            type="text"
          />
          <input
            className="test-sub"
            onChange={handleChange}
            placeholder="sub"
            type="text"
          />
          <input
            className="test-scheduleer"
            onChange={handleChange}
            placeholder="schedule in months"
            type="number"
          />
          <input
            className="test-body"
            onChange={handleChange}
            placeholder="body"
            type="text"
          />
          <input
            className="test-created"
            onChange={handleChange}
            placeholder="created at"
            type="date"
          />
          <input
            className="test-sent"
            onChange={handleChange}
            placeholder="sent at"
            type="date"
          />
        </form>
      </div>
    </div>
  );
}

export default Test;
