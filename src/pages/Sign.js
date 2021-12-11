import "../styles/Sign.css";
import { Button, FormControl, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
// import {login} from "./firebase"
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { auth } from "../firebase";
import logo from "../assest/logowhite.png";
import { useHistory } from "react-router";
function Sign() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const history = useHistory();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  function handleSubmit(e) {
    e.preventDefault();
  }
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  const handleLogin = () => {
    const user = signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log(user);
        history.push("/");
      })
      .catch((error) => console.log(error));
    setEmail("");
    setPassword("");
  };
  return (
    <div className="sign">
      <div className="gradient">
        <img src={logo} />
      </div>
      <div className="form-container">
        <h2>
          Welcome to <span style={{ color: "rgb(19, 119, 254)" }}>MedPro</span>
        </h2>

        <span className="description">
          Your one stop solution for all the medical services
        </span>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <TextField
              className="inputEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="outlined-basic"
              label="Username"
              variant="outlined"
            />
          </FormControl>
          <br />
          <FormControl>
            <TextField
              className="inputPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="outlined-basic"
              label="Password"
              variant="outlined"
            />
          </FormControl>
          <br />
          <div className="buttonContainer">
            <Button
              type="submit"
              variant="contained"
              disabled={!validateForm()}
              onClick={handleLogin}
            >
              Login
            </Button>

            <Button variant="text">Forgot password</Button>
          </div>

          <br />
        </form>
      </div>
    </div>
  );
}

export default Sign;
