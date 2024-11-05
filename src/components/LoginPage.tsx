import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="login-page">
      <Link to="/" className="logo">Bloom Plan</Link>
      <div className="login-container">
        <h1 className="login-title">Plan social media posts
        in easy and free way!</h1>
        <p className="login-subtitle">Log in now and discover newest content ideas.</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-container email-input">
            <input type="email" placeholder=" " required />
            <label>Email</label>
          </div>
          <div className="input-container password-input">
            <input type="password" placeholder=" " required />
            <label>Password</label>
          </div>
          <button type="submit" className="login-button">Log In</button>
        </form>
        <p className="login-alternate">or</p>
        <p className="login-alternate-google">Log in with Google</p>
        <p className="register-prompt">
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
