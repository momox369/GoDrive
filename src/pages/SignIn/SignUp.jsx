import React, { useState } from "react";
import "./SignIn.scss"; // Assume similar styles to SignIn.scss
import logo from "../../assets/logo.png";
import { useAuth } from "../../components/AuthProvider";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      await register(email, username, password);
      navigate("/");
    } catch (error) {
      console.error("Failed to register:", error);
      alert("Failed to register. Please try again.");
    }
  };
  return (
    <div className="sign-in-container">
      <form onSubmit={handleSubmit} className="sign-in-form">
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
          <div className="input-group">
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
          <div className="input-group">
            <label htmlFor="email">Username</label>
            <input
              id="username-input"
              type="text"
              className="signin-boxes"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="input-group">
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
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              className="signin-boxes"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>
          <button
            className="signin-buttons next"
            style={{ marginTop: "1rem" }}
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
