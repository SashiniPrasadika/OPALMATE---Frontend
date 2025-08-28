import React, { useState } from "react";
import "./Customers.css";
import {
  FaSearch,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaStar,
  FaPlus,
  FaEdit,
  FaBoxOpen,
  FaTrash,
} from "react-icons/fa";

const Customers = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+91-9876543210",
      location: "Delhi, India",
      orders: 12,
      rating: 4.7,
    },
    {
      id: 2,
      name: "Ravi Patel",
      email: "ravi.patel@example.com",
      phone: "+91-9876543211",
      location: "Ahmedabad, India",
      orders: 5,
      rating: 4.3,
    },
  ]);

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

  // 👉 Add or Update Customer
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setCustomers(
        customers.map((c) =>
          c.id === editingId ? { ...formData, id: editingId } : c
        )
      );
    } else {
      setCustomers([...customers, { ...formData, id: Date.now() }]);
    }
    setFormData({ name: "", email: "", phone: "", location: "", rating: 1, orders: 0 });
    setEditingId(null);
    setShowForm(false);
  };

  // 👉 Edit Customer
  const handleEdit = (customer) => {
    setFormData(customer);
    setEditingId(customer.id);
    setShowForm(true);
  };

  // 👉 View Orders
  const handleOrders = (customer) => {
    alert(`Customer ${customer.name} has ${customer.orders} orders.`);
  };

  // 👉 Delete Customer
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter((c) => c.id !== id));
    }
  };

  // 👉 Filter customers
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
          <FaPlus /> Add Customer
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <form className="customer-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            required
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
          <input
            type="number"
            placeholder="Rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
          />
          <input
            type="number"
            placeholder="Orders"
            min="0"
            value={formData.orders}
            onChange={(e) => setFormData({ ...formData, orders: e.target.value })}
          />
          <div className="form-buttons">
            <button type="submit">{editingId ? "Update" : "Add"} Customer</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}

      {/* Customer List */}
      <div className="customers-list">
        {filteredCustomers.map((customer) => (
          <div className="customer-card" key={customer.id}>
            <div className="customer-info">
              <div className="customer-avatar">👤</div>
              <div className="customer-details">
                <h2>{customer.name}</h2>
                <p><FaEnvelope /> {customer.email}</p>
                <p><FaPhone /> {customer.phone}</p>
                <p><FaMapMarkerAlt /> {customer.location}</p>
                <div className="rating">
                  <FaStar className="star-icon" /> <strong>{customer.rating}/5.0</strong>
                </div>
                <p><FaBoxOpen /> Orders: <strong>{customer.orders}</strong></p>
              </div>
            </div>

            {/* Actions */}
            <div className="customer-actions">
              <button className="edit-btn" onClick={() => handleEdit(customer)}><FaEdit /> Edit</button>
              <button className="orders-btn" onClick={() => handleOrders(customer)}><FaBoxOpen /> Orders</button>
              <button className="delete-btn" onClick={() => handleDelete(customer.id)}><FaTrash /> Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
