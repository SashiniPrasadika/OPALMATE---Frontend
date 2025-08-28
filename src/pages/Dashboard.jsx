import React from "react";
import "./Dashboard.css";
import { FaGem, FaTasks, FaUsers, FaPlus, FaBoxOpen, FaChartLine } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">
        Welcome to <span className="highlight">OPALMATE</span>
      </h1>
      <p className="dashboard-subtitle">
        Your jewelry business control center
      </p>

      <div className="dashboard-metrics">
        <div className="metric-card">
          <FaGem className="metric-icon" />
          <h3>150</h3>
          <p>Products</p>
        </div>
        <div className="metric-card">
          <FaUsers className="metric-icon" />
          <h3>25</h3>
          <p>Suppliers</p>
        </div>
        <div className="metric-card">
          <FaTasks className="metric-icon" />
          <h3>10</h3>
          <p>Categories</p>
        </div>
        <div className="metric-card">
          <FaChartLine className="metric-icon" />
          <h3>₹1.2M</h3>
          <p>Monthly Sales</p>
        </div>
      </div>

      {/* Panels Section */}
      <div className="dashboard-panels">
        <div className="panel">
          <h3>Recent Activities</h3>
          <ul>
            <li>💎 New product “Diamond Ring” added</li>
            <li>📦 Supplier “GoldStar” updated</li>
            <li>📂 Category “Necklaces” modified</li>
          </ul>
        </div>
        <div className="panel">
          <h3>Upcoming Tasks</h3>
          <ul>
            <li>📊 Inventory check</li>
            <li>🔄 Restock diamond sets</li>
            <li>⭐ Review supplier ratings</li>
          </ul>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <div className="action-button">
          <FaPlus />
          <p>Add Product</p>
        </div>
        <div className="action-button">
          <FaPlus />
          <p>Add Supplier</p>
        </div>
        <div className="action-button">
          <FaPlus />
          <p>Add Category</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
