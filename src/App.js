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
import Reports from "./pages/Reports";   // ✅ Import Reports
import Transactions from "./pages/Transactions"; // ✅ Import Transactions

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
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
            <Route path="/reports" element={<Reports />} /> {/* ✅ Reports route */}
            <Route path="/transactions" element={<Transactions />} /> {/* ✅ Transactions route */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
