import React, { useState } from "react";
import "./ForgotPassword.scss";
import logo from "../../assets/logo.png";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Logic to send password reset email
        console.log("Reset password for email:", email);
        // Navigate to a confirmation page or display a message
        navigate("/passwordresetconfirmation");
    };

    const handleBackToSignIn = () => {
        // Navigate back to the Sign In page
        navigate("/signinpass");
    };

    return (
        <div className="forgot-password-container">
            <form className="forgot-password-form" onSubmit={handleSubmit}>
                <div className="right-panel">
                    <div className="logo-signin">
                        <img src={logo} alt="GoDrive logo" className="logo" id="signinlogo" />
                    </div>
                    <div className="title-signin">
                        <h3>Forgot Password</h3>
                        <p>Please enter your email address to reset your password.</p>
                    </div>
                    <div className="input-group email">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="forgot-password-boxes"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="forgot-password-btns">
                        <Button className="forgot-password-buttons" variant="secondary" onClick={handleBackToSignIn}>
                            Back to Sign In
                        </Button>
                        <Button type="submit" className="forgot-password-buttons next" variant="primary">
                            Reset Password
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;
