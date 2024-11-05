import React from 'react';
import { Link } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="register-page">
      <Link to="/" className="logo">Bloom Plan</Link>
      <div className="register-container">
        <h1 className="register-title">Join Bloom Plan</h1>
        <p className="register-subtitle">Create an account and start planning your social media posts!</p>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-container email-input">
            <input type="email" placeholder=" " required />
            <label>Email</label>
          </div>
          <div className="input-container password-input">
            <input type="password" placeholder=" " required />
            <label>Password</label>
          </div>
          <div className="input-container confirm-password-input">
            <input type="password" placeholder=" " required />
            <label>Confirm Password</label>
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
        <div className='register'>
        <p className="register-alternate">or</p>
        <p className="register-alternate-google">Register with Google</p>
        </div>
        <p className="register-prompt">
          Already have an account?
          <Link to="/login"> Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;