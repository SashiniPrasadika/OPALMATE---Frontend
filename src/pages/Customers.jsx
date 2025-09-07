import React, { useState } from "react";
import "./Customers.css";

// Make sure these files exist in src/assets
import envelopeIcon from "../assets/envelope.png";
import phoneIcon from "../assets/phone-call.png";  // Correct filename
import locationIcon from "../assets/location.png";
import starIcon from "../assets/star.png";
import customerIcon from "../assets/customer.png";
import orderIcon from "../assets/order.png";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import plusIcon from "../assets/plus.png";

const Customers = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: "Priya Sharma", email: "priya.sharma@example.com", phone: "+91-9876543210", location: "Delhi, India", orders: 12, rating: 4.7 },
    { id: 2, name: "Ravi Patel", email: "ravi.patel@example.com", phone: "+91-9876543211", location: "Ahmedabad, India", orders: 5, rating: 4.3 },
  ]);

  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", location: "", rating: 1, orders: 0 });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setCustomers(customers.map(c => c.id === editingId ? { ...formData, id: editingId } : c));
    } else {
      setCustomers([...customers, { ...formData, id: Date.now() }]);
    }
    setFormData({ name: "", email: "", phone: "", location: "", rating: 1, orders: 0 });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (customer) => { setFormData(customer); setEditingId(customer.id); setShowForm(true); };
  const handleOrders = (customer) => { alert(`Customer ${customer.name} has ${customer.orders} orders.`); };
  const handleDelete = (id) => { if(window.confirm("Are you sure?")) setCustomers(customers.filter(c => c.id !== id)); };
  const filteredCustomers = customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="customers-container">
      <div className="customers-header">
        <h1>Customers</h1>
        <p>Manage your customer relationships</p>
        <button className="add-btn" onClick={() => { setShowForm(true); setFormData({ name: "", email: "", phone: "", location: "", rating: 1, orders: 0 }); setEditingId(null); }}>
          <img src={plusIcon} alt="Add" className="button-icon" /> Add Customer
        </button>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {showForm && (
        <form className="customer-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <input type="email" placeholder="Email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <input type="text" placeholder="Phone" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
          <input type="text" placeholder="Location" required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
          <input type="number" placeholder="Rating" min="1" max="5" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} />
          <input type="number" placeholder="Orders" min="0" value={formData.orders} onChange={(e) => setFormData({ ...formData, orders: e.target.value })} />
          <div className="form-buttons">
            <button type="submit">{editingId ? "Update" : "Add"} Customer</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}

      <div className="customers-list">
        {filteredCustomers.map((customer) => (
          <div className="customer-card" key={customer.id}>
            <div className="customer-info">
              <img src={customerIcon} alt="Customer" className="customer-avatar" />
              <div className="customer-details">
                <h2>{customer.name}</h2>
                <p><img src={envelopeIcon} alt="Email" className="icon" /> {customer.email}</p>
                <p><img src={phoneIcon} alt="Phone" className="icon" /> {customer.phone}</p>
                <p><img src={locationIcon} alt="Location" className="icon" /> {customer.location}</p>
                <div className="rating"><img src={starIcon} alt="Rating" className="icon" /> <strong>{customer.rating}/5.0</strong></div>
                <p><img src={orderIcon} alt="Orders" className="icon" /> Orders: <strong>{customer.orders}</strong></p>
              </div>
            </div>

            <div className="customer-actions">
              <button className="edit-btn" onClick={() => handleEdit(customer)}><img src={editIcon} alt="Edit" className="button-icon" /> Edit</button>
              <button className="orders-btn" onClick={() => handleOrders(customer)}><img src={orderIcon} alt="Orders" className="button-icon" /> Orders</button>
              <button className="delete-btn" onClick={() => handleDelete(customer.id)}><img src={deleteIcon} alt="Delete" className="button-icon" /> Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
