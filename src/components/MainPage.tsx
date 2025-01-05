import React, { useState } from "react";
import CustomCalendarPage from "./Calendar/Calendar.tsx"; // Import your CustomCalendarPage
import MiniCalendar from "./Calendar/MiniCalendar.tsx"; // Import the MiniCalendar component
import TrendingNowPage from "./TrendingNowPage/TrendingNowPage.tsx";
import useAuthStore from "../store/useAuthStore"; // Import the useAuthStore hook
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const MainPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard"); // Default tab is 'dashboard'
  const { logout } = useAuthStore(); // Destructure the logout method from the store
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle tab click
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // Function to handle date selection from mini calendar
  const handleDateSelect = (date: Date) => {
    console.log("Selected Date:", date);
    // You can add logic to handle the selected date
  };

  // Function to handle logout
  const handleLogout = () => {
    logout(); // Call the logout method
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <div className="header">
          <h1 className="text-2xl font-bold">Start planning</h1>
          <p className="text-gray-400 text-sm mt-1">& make it real! 🎀</p>
        </div>

        <div className="menu mt-8">
          <button
            className={`w-full flex items-center py-2 px-4 rounded-lg mb-3 ${
              activeTab === "dashboard"
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => handleTabClick("dashboard")}
          >
            <i className="material-icons mr-2">home</i>
            Dashboard
          </button>

          <button
            className={`w-full flex items-center py-2 px-4 rounded-lg mb-3 ${
              activeTab === "planner"
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => handleTabClick("planner")}
          >
            <i className="material-icons mr-2">calendar_today</i>
            Planner
          </button>

          <button
            className={`w-full flex items-center py-2 px-4 rounded-lg mb-3 ${
              activeTab === "trending"
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => handleTabClick("trending")}
          >
            <i className="material-icons mr-2">trending_up</i>
            Trending Now
          </button>

          <button
            className={`w-full flex items-center py-2 px-4 rounded-lg ${
              activeTab === "settings"
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => handleTabClick("settings")}
          >
            <i className="material-icons mr-2">settings</i>
            Settings
          </button>

          {/* Logout Button */}
          <button
            className="w-full flex items-center py-2 px-4 rounded-lg mt-6 text-gray-300 hover:bg-gray-700"
            onClick={handleLogout}
          >
            <i className="material-icons mr-2">logout</i>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Welcome to Bloom Plan</h2>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">
                  Total Posts
                </h3>
                <p className="text-3xl font-bold text-blue-500">25</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">
                  Engagement Rate
                </h3>
                <p className="text-3xl font-bold text-green-500">12%</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">
                  Upcoming Events
                </h3>
                <p className="text-3xl font-bold text-purple-500">3</p>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
              <ul>
                <li className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span>Instagram Post</span>
                  <span className="text-sm text-gray-500">
                    2024-10-15 at 12:00 PM
                  </span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span>Team Meeting</span>
                  <span className="text-sm text-gray-500">
                    2024-10-16 at 10:00 AM
                  </span>
                </li>
                <li className="flex justify-between items-center py-2">
                  <span>Facebook Ad</span>
                  <span className="text-sm text-gray-500">
                    2024-10-17 at 3:00 PM
                  </span>
                </li>
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
              <div className="flex gap-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                  Add New Post
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                  View Analytics
                </button>
              </div>
            </div>

            {/* Mini Calendar */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-8">
              <h3 className="text-xl font-semibold mb-4">Mini Calendar</h3>
              <MiniCalendar onSelectDate={handleDateSelect} />
            </div>
          </div>
        )}

        {activeTab === "planner" && <CustomCalendarPage />}
        {activeTab === "trending" && <TrendingNowPage />}
      </div>
    </div>
  );
};

export default MainPage;
