import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaCubes,
  FaGem,
  FaExclamationTriangle,
  FaUsers,
  FaTruck,
  FaUserTie,
  FaReceipt,
  FaFileAlt,
  FaChartLine
} from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { MdWork } from "react-icons/md";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon">💎</div>
        <div>
          <h2 className="brand-title">OPALMATE</h2>
          <p className="brand-subtitle">ISHARA Jewellers ERP</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
          <FaTachometerAlt /> Dashboard
        </NavLink>

        <p className="section-title">TIME MANAGEMENT</p>
        <NavLink to="/client-meetings" className={({ isActive }) => (isActive ? "active" : "")}>
          <FaCalendarAlt /> Client Meetings
        </NavLink>
        <NavLink to="/workflows" className={({ isActive }) => (isActive ? "active" : "")}>
          <MdWork /> Workflows
        </NavLink>
        <NavLink to="/schedule" className={({ isActive }) => (isActive ? "active" : "")}>
          <BiTimeFive /> Schedule
        </NavLink>

        <p className="section-title">INVENTORY MANAGEMENT</p>
        <NavLink to="/raw-materials" className={({ isActive }) => (isActive ? "active" : "")}>
          <FaCubes /> Raw Materials
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>
          <FaGem /> Products
        </NavLink>
        <NavLink to="/stock-alerts" className={({ isActive }) => (isActive ? "active" : "")}>
          <FaExclamationTriangle /> Stock Alerts
        </NavLink>

        <p className="section-title">PEOPLE MANAGEMENT</p>
        <NavLink to="/employees" className={({ isActive }) => (isActive ? "active" : "")}>
          <FaUsers /> Employees
        </NavLink>
        <NavLink to="/suppliers" className={({ isActive }) => (isActive ? "active" : "")}>
          <FaTruck /> Suppliers
        </NavLink>
        <NavLink to="/customers" className={({ isActive }) => (isActive ? "active" : "")}>
          <FaUserTie /> Customers
        </NavLink>

        <p className="section-title">FINANCIAL MANAGEMENT</p>
        <NavLink to="/billing" className={({ isActive }) => (isActive ? "active" : "")}>
          <FaReceipt /> Billing
        </NavLink>
        <NavLink to="/reports" className={({ isActive }) => (isActive ? "active" : "")}>
          <FaFileAlt /> Reports
        </NavLink>
        <NavLink to="/transactions" className={({ isActive }) => (isActive ? "active" : "")}>
          <FaChartLine /> Transactions
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
