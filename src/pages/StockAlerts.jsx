import React, { useState, useEffect } from "react";
import "./StockAlerts.css";
import { getAlerts, addAlert, updateAlert, deleteAlert } from "../api/stockAlerts";

const StockAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAlert, setEditingAlert] = useState(null);
  const [formData, setFormData] = useState({
    product: "",
    current_stock: "",
    threshold: "",
    alert_level: "Low",
  });

  // Fetch alerts from backend
  const fetchAlerts = async () => {
    try {
      const data = await getAlerts();
      setAlerts(data);
    } catch (err) {
      console.error("Error fetching alerts:", err);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update alert
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAlert) {
        await updateAlert(editingAlert.alert_id, formData);
      } else {
        await addAlert(formData);
      }
      setShowForm(false);
      setEditingAlert(null);
      setFormData({ product: "", current_stock: "", threshold: "", alert_level: "Low" });
      fetchAlerts();
    } catch (err) {
      console.error("Error saving alert:", err);
    }
  };

  // Edit alert
  const handleEdit = (alert) => {
    setEditingAlert(alert);
    setFormData({
      product: alert.product,
      current_stock: alert.current_stock,
      threshold: alert.threshold,
      alert_level: alert.alert_level,
    });
    setShowForm(true);
  };

  // Delete alert
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this alert?")) {
      try {
        await deleteAlert(id);
        fetchAlerts();
      } catch (err) {
        console.error("Error deleting alert:", err);
      }
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
            name="current_stock"
            placeholder="Current Stock"
            value={formData.current_stock}
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
          <select name="alert_level" value={formData.alert_level} onChange={handleChange}>
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
              <tr key={alert.alert_id}>
                <td>{alert.product}</td>
                <td>{alert.current_stock}</td>
                <td>{alert.threshold}</td>
                <td className={alert.alert_level.toLowerCase()}>{alert.alert_level}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(alert)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(alert.alert_id)}>Delete</button>
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
