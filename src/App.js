import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard"; // ✅ import your Dashboard
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            {/* Default Route → Dashboard */}
            <Route path="/" element={<Dashboard />} />

            {/* You can add more routes later, like Products, Suppliers, etc. */}
            {/* <Route path="/products" element={<Products />} /> */}
            {/* <Route path="/suppliers" element={<Suppliers />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


