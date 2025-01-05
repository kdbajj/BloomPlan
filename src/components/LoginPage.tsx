import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Używamy useNavigate do przekierowań
import "./LoginPage.css";
import useAuthStore from "../store/useAuthStore";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login(email, password);
    if (response.token) {
      navigate("/mainpage");
    }
  };

  return (
    <div className="login-page">
      <Link to="/" className="logo">
        Bloom Plan
      </Link>
      <div className="login-container">
        <h1 className="login-title">
          Plan social media posts in an easy and free way!
        </h1>
        <p className="login-subtitle">
          Log in now and discover the newest content ideas.
        </p>

        {/* Formularz logowania */}
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-container email-input">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
            />
            <label>Email</label>
          </div>
          <div className="input-container password-input">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
            />
            <label>Password</label>
          </div>
          <button type="button" className="login-button" onClick={handleLogin}>
            Log In
          </button>{" "}
          {/* Przekierowanie przy kliknięciu */}
        </form>

        <p className="register-prompt">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
