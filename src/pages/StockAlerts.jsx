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

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const data = await getAlerts();
      setAlerts(data);
    } catch (err) {
      console.error("Error fetching alerts:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const handleEdit = (alert) => {
    setEditingAlert(alert);
    setFormData({ ...alert });
    setShowForm(true);
  };

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

      {/* Cards */}
      {alerts.length === 0 ? (
        <p className="no-alerts">All stock levels are sufficient.</p>
      ) : (
        <div className="alerts-cards">
          {alerts.map((alert) => (
            <div className="alert-card" key={alert.alert_id}>
              <h3>{alert.product}</h3>
              <p><strong>Current Stock:</strong> {alert.current_stock}</p>
              <p><strong>Threshold:</strong> {alert.threshold}</p>
              <span className={`alert-level ${alert.alert_level.toLowerCase()}`}>
                {alert.alert_level}
              </span>
              <div className="alert-actions">
                <button className="btn-edit" onClick={() => handleEdit(alert)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(alert.alert_id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editingAlert ? "Edit Alert" : "Add Alert"}</h3>
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
              <button type="submit" onClick={handleSubmit}>{editingAlert ? "Update" : "Add"} Alert</button>
              <button type="button" onClick={() => { setShowForm(false); setEditingAlert(null); }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StockAlerts;
