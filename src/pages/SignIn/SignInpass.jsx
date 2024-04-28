import React, { useState } from "react";
import "./SignIn.scss";
import logo from "../../assets/logo.png";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignInPass = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password, rememberMe);
    navigate("/home");
  };

  const handleSignUp = () => {
    console.log("Redirect to Sign Up");
  };

  const handleForgotPassword = () => {
    // Redirect to the Forgot Password page or component
    navigate("/forgotpasswordpage");
  };

  return (
      <div className="sign-in-container">
        <form className="sign-in-form" onSubmit={handleSubmit}>
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
            </div>
            <div className="input-group">
              <label>
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />{" "}
                Remember Me
              </label>
            </div>
            <div className="signin-btns">
              <Button className="signin-buttons" variant="secondary" onClick={handleForgotPassword}>
                Forgot Password?
              </Button>
              <Button
                  type="submit"
                  className="signin-buttons next"
                  variant="primary"
              >
                Sign In
              </Button>
            </div>
          </div>
        </form>
      </div>
  );
};

export default SignInPass;
