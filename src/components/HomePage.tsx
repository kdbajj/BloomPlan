import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="homepage-container">
      <h1 className='text'>Plan social media posts in easy and free way!</h1>
      <div className="content-center">
        <h1 className='app-name'>Bloom Plan</h1>
        <div className='slogan'>Plan. Bloom. Shine.</div>
      </div>
      <div className="login-section">
        <h2 className="login-text"><Link to="/login">Login</Link></h2>
        <p className="register-text">
          You have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default HomePage;
