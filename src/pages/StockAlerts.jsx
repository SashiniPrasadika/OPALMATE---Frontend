import React, { useState } from "react";
import "./StockAlerts.css";

const StockAlerts = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, product: "Steel Rods", currentStock: 8, threshold: 10, alertLevel: "Low" },
    { id: 2, product: "Plastic Sheets", currentStock: 3, threshold: 5, alertLevel: "Critical" },
    { id: 3, product: "Copper Wire", currentStock: 12, threshold: 15, alertLevel: "Low" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingAlert, setEditingAlert] = useState(null);
  const [formData, setFormData] = useState({
    product: "",
    currentStock: "",
    threshold: "",
    alertLevel: "Low",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Update alert
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAlert) {
      setAlerts(alerts.map((a) => (a.id === editingAlert.id ? { ...formData, id: editingAlert.id } : a)));
    } else {
      setAlerts([...alerts, { ...formData, id: Date.now() }]);
    }
    setFormData({ product: "", currentStock: "", threshold: "", alertLevel: "Low" });
    setEditingAlert(null);
    setShowForm(false);
  };

  // Edit alert
  const handleEdit = (alert) => {
    setEditingAlert(alert);
    setFormData(alert);
    setShowForm(true);
  };

  // Delete alert
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this alert?")) {
      setAlerts(alerts.filter((a) => a.id !== id));
    }
  };

  return (
    <section className="stock-alerts-container">
      <header className="alerts-header">
        <h1>Stock Alerts</h1>
        <p>Manage items with low or critical stock levels.</p>
        <button className="btn-add" onClick={() => setShowForm(true)}>Add Alert</button>
      </header>

      {showForm && (
        <form className="alert-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="product"
            placeholder="Product Name"
            value={formData.product}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="currentStock"
            placeholder="Current Stock"
            value={formData.currentStock}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="threshold"
            placeholder="Threshold"
            value={formData.threshold}
            onChange={handleChange}
            required
          />
          <select name="alertLevel" value={formData.alertLevel} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Critical">Critical</option>
          </select>
          <div className="form-buttons">
            <button type="submit">{editingAlert ? "Update" : "Add"} Alert</button>
            <button type="button" onClick={() => { setShowForm(false); setEditingAlert(null); }}>Cancel</button>
          </div>
        </form>
      )}

      {alerts.length === 0 ? (
        <p className="no-alerts">All stock levels are sufficient.</p>
      ) : (
        <table className="stock-alerts-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Current Stock</th>
              <th>Threshold</th>
              <th>Alert Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => (
              <tr key={alert.id}>
                <td>{alert.product}</td>
                <td>{alert.currentStock}</td>
                <td>{alert.threshold}</td>
                <td className={alert.alertLevel.toLowerCase()}>{alert.alertLevel}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(alert)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(alert.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default StockAlerts;
