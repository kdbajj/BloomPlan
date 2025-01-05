// components/RegisterPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../utils/auth';  // dodaj import
import './RegisterPage.css';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    try {
      await register(email, password);  // rejestracja
      window.location.href = '/login';  // przekierowanie do logowania po udanej rejestracji
    } catch {
      setErrorMessage('User already exists');  // komunikat o błędzie
    }
  };

  return (
    <div className="register-page">
      <Link to="/" className="logo">Bloom Plan</Link>
      <div className="register-container">
        <h1 className="register-title">Join Bloom Plan</h1>
        <p className="register-subtitle">Create an account and start planning your social media posts!</p>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-container email-input">
            <input
              type="email"
              placeholder=" "
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className="input-container password-input">
            <input
              type="password"
              placeholder=" "
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <div className="input-container confirm-password-input">
            <input
              type="password"
              placeholder=" "
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label>Confirm Password</label>
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}  {/* Wyświetl błąd */}
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
