import React, { useState } from "react";
import "./Transactions.css";
import { FaArrowUp, FaArrowDown, FaCalendarAlt, FaSearch } from "react-icons/fa";

const Transactions = () => {
  const [search, setSearch] = useState("");
  const [transactions] = useState([
    {
      id: 1,
      title: "Payment from Mrs. Sharma",
      type: "Income",
      category: "Sales",
      date: "1/15/2024",
      amount: 125000,
    },
    {
      id: 2,
      title: "Gold purchase from supplier",
      type: "Expense",
      category: "Materials",
      date: "1/14/2024",
      amount: -45000,
    },
    {
      id: 3,
      title: "Custom ring order",
      type: "Income",
      category: "Sales",
      date: "1/13/2024",
      amount: 85000,
    },
  ]);

  const filteredTransactions = transactions.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="transactions-container">
      <h2 className="transactions-title">Transactions</h2>
      <p className="transactions-subtitle">
        Track all financial transactions
      </p>

      {/* Search Bar */}
      <div className="search-box">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Transactions List */}
      <div className="transactions-list">
        {filteredTransactions.map((t) => (
          <div key={t.id} className="transaction-card">
            <div
              className={`icon-box ${
                t.type === "Income" ? "income-icon" : "expense-icon"
              }`}
            >
              {t.type === "Income" ? <FaArrowUp /> : <FaArrowDown />}
            </div>
            <div className="transaction-details">
              <h3>{t.title}</h3>
              <p className="meta">
                <FaCalendarAlt className="calendar-icon" /> {t.date} &nbsp; | &nbsp; 
                Category: {t.category}
              </p>
              <span
                className={`tag ${t.type === "Income" ? "income-tag" : "expense-tag"}`}
              >
                {t.type}
              </span>
            </div>
            <div
              className={`transaction-amount ${
                t.type === "Income" ? "income" : "expense"
              }`}
            >
              {t.type === "Income" ? "+" : "-"}₹{Math.abs(t.amount).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
