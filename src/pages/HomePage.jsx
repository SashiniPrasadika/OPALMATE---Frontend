import React from "react";
import backgroundImage from "../assets/ishara.jpg"; // ✅ Import image
import "./HomePage.css";

const HomePage = () => {
  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${backgroundImage})` }} // ✅ Use inline style
    >
      <div className="overlay">
        <h1 className="home-title">Welcome to Opalmate</h1>
        <button
          className="login-btn"
          onClick={() => (window.location.href = "/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default HomePage;

