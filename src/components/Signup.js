import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCredentials, setUserCredentials] = useState({});
  const pageHistory = useHistory();

  const signupSubmitHandler = () => {
    setUserCredentials({
      userName: userName,
      email: email,
      password: password,
    });

    axios
      .post("http://localhost:3001/signin/auth", userCredentials)
      .then((res) => {
        if (res.data === "account already exists") {
          alert("Account already exists. Try Logging In");
        } else if (res.data === "incorrect password") {
          alert("Incorrect password");
        } else {
          console.log(res.data);
          pageHistory.push("/home/" + res.data.email);
        }
      })
      .catch((err) => {
        alert("Something went wrong");
        console.log("signup: cant fetch data");
      });
  };

  return (
    <div className="signup-body">
      <div className="container">
        <div className="signup-text">SIGN UP</div>
        <div className="row">
          <input
            onChange={(e) => setUserName(e.target.value)}
            className="userName-input"
            placeholder="User Name"
            type="text"
          />
        </div>
        <div className="row">
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="email-input"
            placeholder="Email"
            type="email"
          />
        </div>
        <div className="row">
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="password-input"
            placeholder="Password"
            type="text"
          />
        </div>
        <div className="row">
          <input
            onClick={signupSubmitHandler}
            className="submit-button"
            type="submit"
            value="submit"
          />
        </div>
        <div className="old-user">
          <p>
            <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
