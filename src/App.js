import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <h2>Welcome to OPALMATE ERP</h2>
          <p>Select an option from the sidebar to continue.</p>
        </div>
      </div>
    </Router>
  );
}

export default App;

