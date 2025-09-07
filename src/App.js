import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Suppliers from "./pages/Suppliers";
import Categories from "./pages/Categories";
import Login from "./pages/Login";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import RawMaterials from "./pages/RawMaterials";
import StockAlerts from "./pages/StockAlerts";
import Workflows from "./pages/Workflows";
import Schedule from "./pages/Schedule";
import ClientMeeting from "./pages/ClientMeeting";
import Billing from "./pages/Billing";
import Reports from "./pages/Reports";
import Transactions from "./pages/Transactions";
import HomePage from "./pages/HomePage"; // ✅ Import HomePage

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Homepage without sidebar */}
        <Route path="/" element={<HomePage />} />

        {/* ✅ Login without sidebar */}
        <Route path="/login" element={<Login />} />

        {/* ✅ All other pages with sidebar */}
        <Route
          path="*"
          element={
            <div className="app-container">
              <Sidebar />
              <div className="main-content">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/suppliers" element={<Suppliers />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/raw-materials" element={<RawMaterials />} />
                  <Route path="/stock-alerts" element={<StockAlerts />} />
                  <Route path="/workflows" element={<Workflows />} />
                  <Route path="/schedule" element={<Schedule />} />
                  <Route path="/client-meetings" element={<ClientMeeting />} />
                  <Route path="/billing" element={<Billing />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/transactions" element={<Transactions />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
