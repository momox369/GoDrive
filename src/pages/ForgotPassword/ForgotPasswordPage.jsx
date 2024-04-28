import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import '../SignIn/SignIn.scss'; // Import the SignIn.scss file

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState(''); // New state for the new password
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Send a POST request to the /forgotpassword endpoint
        const response = await fetch('http://localhost:3001/forgotpassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, newPassword }),
        });

        if (response.ok) {
            console.log(`Password reset email sent to: ${email}`);
            console.log(`New password: ${newPassword}`); // Log the new password
            navigate('/signin');
        } else {
            const data = await response.json();
            if (data.message === 'User not found') {
                alert('User not found');
            } else {
                console.error('Error resetting password:', data.message);
            }
        }
    };

    return (
        <div className="sign-in-container">
            <form className="sign-in-form" onSubmit={handleSubmit}>
                <div className="right-panel">
                    <div className="logo-signin">
                        <img src={logo} alt="GoDrive logo" className="logo" id="signinlogo" />
                    </div>
                    <div className="title-signin">
                        <h3>Forgot Password</h3>
                        <p>Please enter your email address and new password to reset your password.</p>
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
                    <div className="input-group password"> {/* New input field for the new password */}
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            id="newPassword"
                            type="password"
                            className="signin-boxes"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter your new password"
                            required
                        />
                    </div>
                    <div className="signin-btns">
                        <Button className="signin-buttons" variant="secondary" onClick={() => navigate('/')}>
                            Back to Sign In
                        </Button>
                        <Button type="submit" className="signin-buttons next" variant="primary">
                            Reset Password
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ForgotPasswordPage;