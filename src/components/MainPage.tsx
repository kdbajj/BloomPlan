import React, { useState } from 'react';
import './MainPage.css';

const MainPage: React.FC = () => {

    const [activeTab, setActiveTab] = useState('dashboard');

  // Funkcja obsługująca kliknięcie w zakładkę
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="main-page-container">
      <div className="sidebar">
        <div className="header">
          <h1>Start planning <p>& make it real! 🎀</p></h1>
        </div>

        <div className="menu">
          <button
            className={`menu-button ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleTabClick('dashboard')}
          >
            Dashboard
          </button>

          {/* Planner Button */}
          <button
            className={`menu-button ${activeTab === 'planner' ? 'active' : ''}`}
            onClick={() => handleTabClick('planner')}
          >
            Planner
          </button>

          {/* Trending now Button */}
          <button
            className={`menu-button ${activeTab === 'trending' ? 'active' : ''}`}
            onClick={() => handleTabClick('trending')}
          >
            Trending now
          </button>

          {/* Settings Button */}
          <button
            className={`menu-button ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => handleTabClick('settings')}
          >
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
