import React, { useState } from "react";
import "./Reports.css";
import { FaDollarSign, FaArrowUp, FaCalendarAlt, FaFileAlt } from "react-icons/fa";

const Reports = () => {
  const [monthlyData] = useState([
    { month: "Jan", sales: 785000, expenses: 125000 },
    { month: "Dec", sales: 892000, expenses: 140000 },
    { month: "Nov", sales: 675000, expenses: 115000 },
  ]);

  const totalOrders = 45;

  // ✅ Handlers for Quick Reports
  const handleSalesReports = () => {
    alert("📊 Sales Report generated successfully!");
  };

  const handleProfitLoss = () => {
    alert("💰 Profit & Loss Report generated successfully!");
  };

  const handleMonthlySummary = () => {
    alert("🗓️ Monthly Summary Report generated successfully!");
  };

  return (
    <div className="reports-container">
      <h2 className="reports-title">Financial Reports</h2>
      <p className="reports-subtitle">
        View business performance and financial insights
      </p>

      {/* Top Stats */}
      <div className="stats-cards">
        <div className="card">
          <h3>This Month Sales</h3>
          <p className="value">₹785,000</p>
          <FaDollarSign className="icon green" />
        </div>
        <div className="card">
          <h3>Expenses</h3>
          <p className="value">₹125,000</p>
          <FaArrowUp className="icon red" />
        </div>
        <div className="card">
          <h3>Net Profit</h3>
          <p className="value">₹660,000</p>
          <FaArrowUp className="icon green" />
        </div>
        <div className="card">
          <h3>Orders</h3>
          <p className="value">{totalOrders}</p>
          <FaCalendarAlt className="icon blue" />
        </div>
      </div>

      {/* Monthly Performance */}
      <div className="section">
        <h3 className="section-title">
          <FaFileAlt className="section-icon" /> Monthly Performance
        </h3>
        <div className="performance-list">
          {monthlyData.map((data, index) => {
            const profit = data.sales - data.expenses;
            return (
              <div className="performance-item" key={index}>
                <div className="month-badge">{data.month}</div>
                <div className="performance-details">
                  <p>
                    <strong>Sales:</strong> ₹{data.sales.toLocaleString()}
                  </p>
                  <p>
                    <strong>Expenses:</strong> ₹{data.expenses.toLocaleString()}
                  </p>
                </div>
                <div className="profit">+₹{profit.toLocaleString()} Profit</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Reports */}
      <div className="section">
        <h3 className="section-title">Quick Reports</h3>
        <div className="quick-buttons">
          <button onClick={handleSalesReports}>Sales Reports</button>
          <button onClick={handleProfitLoss}>Profits & Losses</button>
          <button onClick={handleMonthlySummary}>Monthly Summary</button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
