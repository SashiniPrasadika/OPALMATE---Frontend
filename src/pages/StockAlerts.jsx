import React, { useState } from "react";
import { FaExclamationTriangle, FaTrash } from "react-icons/fa";
import "./StockAlerts.css";

const StockAlerts = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, product: "Steel Rods", currentStock: 8, threshold: 10, alertLevel: "Low" },
    { id: 2, product: "Plastic Sheets", currentStock: 3, threshold: 5, alertLevel: "Critical" },
    { id: 3, product: "Copper Wire", currentStock: 12, threshold: 15, alertLevel: "Low" },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this alert?")) {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }
  };

  return (
    <section className="stock-alerts-container" aria-label="Stock Alerts Section">
      <header>
        <h1 className="title">Stock Alerts</h1>
        <p className="subtitle">Keep track of items with low or critical stock levels.</p>
      </header>

      {alerts.length === 0 ? (
        <p className="no-alerts">🎉 All stock levels are sufficient.</p>
      ) : (
        <div className="table-wrapper" role="table" aria-label="Stock Alerts Table">
          <table className="stock-alerts-table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Current Stock</th>
                <th scope="col">Threshold</th>
                <th scope="col">Alert Level</th>
                <th scope="col" className="actions-header" aria-label="Actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map(({ id, product, currentStock, threshold, alertLevel }) => (
                <tr key={id}>
                  <td>{product}</td>
                  <td>{currentStock}</td>
                  <td>{threshold}</td>
                  <td>
                    <span className={`alert-level ${alertLevel.toLowerCase()}`}>
                      <FaExclamationTriangle
                        className="alert-icon"
                        aria-hidden="true"
                        focusable="false"
                      />
                      <span className="visually-hidden">Alert level:</span> {alertLevel}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-delete"
                      title={`Remove alert for ${product}`}
                      aria-label={`Remove alert for ${product}`}
                      onClick={() => handleDelete(id)}
                    >
                      <FaTrash aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default StockAlerts;

