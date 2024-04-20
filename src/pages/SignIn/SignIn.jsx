import React, { useState } from 'react';
import './SignIn.scss';  // Using SCSS for styles
import logo from "../../assets/logo.png";  // Importing logo from assets

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password, rememberMe);
  };

  const handleSignUp = () => {
    console.log("Redirect to Sign Up");
    // Implement redirection or modal for sign up here
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={handleSubmit}>
        <div className="left-panel">
          <img src={logo} alt="GoDrive logo" className="logo" id='signinlogo' />
          <h1>Sign In</h1>
        </div>
        <div className="right-panel">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
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
              /> Remember Me
            </label>
          </div>
          <button type="submit">Sign In</button>
          <button type="button" onClick={handleSignUp}>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
