import React, { useState } from 'react';
import './style.css';
import 'font-awesome/css/font-awesome.min.css';

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (username.trim() === "" || password.trim() === "") {
            alert("Please fill out both username and password fields.");
            return;
        }

        if (username === "testuser" && password === "password") {
            alert("Login successful!");
            window.location.href = "/home";
        } else {
            alert("Invalid username or password.");
        }
    };

    const handleSocialLogin = (platform) => {
        alert(`${platform} login clicked!`);
    };

    return (
        <div className="outer-background">
            <div className="container">
                <div className="login-box">
                    <h2>MEMBER LOGIN</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder="Type Your Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <i className="fa fa-user"></i>
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                placeholder="Type Your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <i className="fa fa-lock"></i>
                        </div>
                        <button type="submit" className="login-btn">LOGIN</button>
                    </form>
                    <p className="or">or</p>
                    <div className="social-login">
                        <button className="fb-btn" onClick={() => handleSocialLogin("Facebook")}>
                            <i className="fa fa-facebook"></i> Sign in with Facebook
                        </button>
                        <button className="google-btn" onClick={() => handleSocialLogin("Google")}>
                            <i className="fa fa-google"></i> Sign in with Google
                        </button>
                        <button className="twitter-btn" onClick={() => handleSocialLogin("Twitter")}>
                            <i className="fa fa-twitter"></i> Sign in with Twitter
                        </button>
                    </div>
                    <div className="footer-links">
                        <a href="/forgot-password">Forgot Password?</a>
                        <a href="/register" className="register">Register</a>
                    </div>
                </div>
                <div className="image-box">
                    <img src="bg.jpg" alt="Restaurant" />
                    <div className="overlay">
                        <h1>QUICK SERVICE RESTAURANT</h1>
                        <p>Your Perfect Place to Taste Delicious Foods</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
