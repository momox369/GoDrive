import React, { useState } from "react";
import "./SignIn.scss";
import logo from "../../assets/logo.png";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthProvider";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await verifyEmail(email); // Call login function
      navigate("/loginpass"); // Redirect to password page if email exists
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  const handleRegisterClick = () => {
    navigate("/signup"); // Navigate to the signup page
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
            <Button
              type="submit"
              className="signin-buttons next"
              variant="primary"
            >
              Next
            </Button>
          </div>
          <span className="no-account">
            Don't Have An Account?{" "}
            <span onClick={handleRegisterClick} className="register-here">
              Register Here
            </span>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignIn;