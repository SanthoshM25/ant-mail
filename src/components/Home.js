import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home(props) {
  const userEmail = props.match.params.email;
  const [details, setDetails] = useState({
    email: userEmail,
    to: [""],
    cc: "",
    sub: "",
    schedulerSelector: "",
    mailBody: "",
    id: "",
  });

  // console.log(props.match.params.email);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
    console.log(details);
  };

  const handleSubmit = (e) => {
    axios
      .post(" http://localhost:3001/posts/message", details)
      .then((res) => {
        console.log("mail updated succesfully");
      })
      .catch((err) => {
        console.log(`error: ${err}`);
      });

    setDetails({
      to: [""],
      cc: "",
      sub: "",
      schedulerSelector: "",
      mailBody: "",
      id: "",
    });
  };

  return (
    <div className="home">
      <div className="home-container">
        <div className="sidebar">
          <Link to="/home">Home</Link>
          <Link to="/history">History</Link>
        </div>
        <div className="form-container">
          <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <div className="row">
              <textarea
                className="home-from"
                onChange={handleChange}
                name="from"
                value={userEmail}
                placeholder="from"
                type="email"
              />
            </div>
            <div className="row">
              <textarea
                className="home-to "
                onChange={handleChange}
                name="to"
                placeholder="to"
                type="email"
              />
            </div>
            <div className="row">
              <textarea
                className="home-cc "
                onChange={handleChange}
                name="cc"
                placeholder="cc"
                type="text"
              />
            </div>
            <div className="row">
              <textarea
                className="home-sub"
                onChange={handleChange}
                name="sub"
                placeholder="sub"
                type="text"
              />
            </div>
            <div className="row">
              <textarea
                className="scheduler"
                onChange={handleChange}
                name="schedulerSelector"
                placeholder="auto schedule(in hours)"
                type="text"
              />
            </div>
            <div className="row">
              <textarea
                className="home-body"
                onChange={handleChange}
                name="mailBody"
                placeholder="body"
                type="text"
              />
            </div>

            <input className="submit-button" type="submit" value="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
