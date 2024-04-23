import React, { useState } from "react";
import "./SignIn.scss";
import logo from "../../assets/logo.png";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password, rememberMe);
    navigate("/loginpass")
  };

  const handleSignUp = () => {
    console.log("Redirect to Sign Up");
  };

  return (
    <div className="sign-in-container">
      <form className="sign-in-form" onSubmit={handleSubmit}>
        {/* <div className="left-panel">
          
          <h1>Sign In</h1>
        </div> */}
        <div className="right-panel">
          <div className="logo-signin">
            <img
              src={logo}
              alt="GoDrive logo"
              className="logo"
              id="signinlogo"
            />
          </div>
          <div className="title-signin">
            <h3>Sign in</h3>
            <h4>Use your Google Account</h4>
          </div>
          <div className="input-group email">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="signin-boxes"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="signin-btns">
            <Button className="signin-buttons" variant="secondary">
              Create account
            </Button>
            <Button
              type="submit"
              className="signin-buttons next"
              variant="primary"
            >
              Next
            </Button>
          </div>
          {/* <div className="input-group password">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="signin-boxes"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div> */}
          {/* <div className="input-group">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />{" "}
              Remember Me
            </label>
          </div> */}
          {/* <button id="signin-btn" type="submit">
            Sign In
          </button>
          <button id="signup-btn" type="button" onClick={handleSignUp}>
            Sign Up
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default SignIn;
