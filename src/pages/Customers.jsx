import React, { useState, useEffect } from "react";
import "./Customers.css";
import axios from "axios";
import { getCustomers, addCustomer, updateCustomer, deleteCustomer } from "../api/customers";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    rating: 1,
    orders: 0,
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // ✅ Fetch customers when component loads
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await getCustomers();
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateCustomer(editingId, formData);
      } else {
        await addCustomer(formData);
      }
      fetchCustomers(); // refresh list after add/update
      setFormData({ name: "", email: "", phone: "", location: "", rating: 1, orders: 0 });
      setEditingId(null);
      setShowForm(false);
    } catch (err) {
      console.error("Error saving customer:", err);
    }
  };

  const handleEdit = (customer) => {
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      location: customer.location,
      rating: customer.rating,
      orders: customer.orders,
    });
    setEditingId(customer.customer_id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await deleteCustomer(id);
        fetchCustomers();
      } catch (err) {
        console.error("Error deleting customer:", err);
      }
    }
  };

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="customers-container">
      <div className="customers-header">
        <h1>Customers</h1>
        <p>Manage your customer relationships</p>
        <button
          className="add-btn"
          onClick={() => {
            setShowForm(true);
            setFormData({ name: "", email: "", phone: "", location: "", rating: 1, orders: 0 });
            setEditingId(null);
          }}
        >
          + Add Customer
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="customers-list">
        {filteredCustomers.map((customer) => (
          <div className="customer-card" key={customer.customer_id}>
            <div className="customer-info">
              <div className="customer-details">
                <h2>{customer.name}</h2>
                <p>Email: {customer.email}</p>
                <p>Phone: {customer.phone}</p>
                <p>Location: {customer.location}</p>
                <div className="rating"><strong>{customer.rating}/5.0</strong></div>
                <p>Orders: <strong>{customer.orders}</strong></p>
              </div>
            </div>

            <div className="customer-actions">
              <button className="edit-btn" onClick={() => handleEdit(customer)}>
                Edit
              </button>
              <button className="orders-btn" onClick={() => alert(`Customer ${customer.name} has ${customer.orders} orders.`)}>
                Orders
              </button>
              <button className="delete-btn" onClick={() => handleDelete(customer.customer_id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="customer-form-overlay">
          <form className="customer-form" onSubmit={handleSubmit}>
            <button className="close-btn" type="button" onClick={() => setShowForm(false)}>✖</button>
            <h2>{editingId ? "Edit Customer" : "Add Customer"}</h2>

            <label>Name</label>
            <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

            <label>Email</label>
            <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

            <label>Phone</label>
            <input type="text" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />

            <label>Location</label>
            <input type="text" required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />

            <label>Rating</label>
            <input type="number" min="1" max="5" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} />

            <label>Orders</label>
            <input type="number" min="0" value={formData.orders} onChange={(e) => setFormData({ ...formData, orders: e.target.value })} />

            <div className="form-buttons">
              <button type="submit" className="save-btn">{editingId ? "Update" : "Add"}</button>
              <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Customers;
