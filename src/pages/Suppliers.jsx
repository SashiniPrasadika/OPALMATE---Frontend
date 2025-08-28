import React, { useState } from "react";
import "./Suppliers.css";
import {
  FaSearch,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaStar,
  FaPlus,
  FaEdit,
  FaBox
} from "react-icons/fa";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: "Gold Supplier Ltd",
      category: "Precious Metals",
      status: "Active",
      contactPerson: "Mr. Suresh Kumar",
      email: "suresh@goldsupplier.com",
      phone: "+91-9876543210",
      location: "Mumbai, Maharashtra",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Diamond House",
      category: "Gemstones",
      status: "Active",
      contactPerson: "Ms. Kavita Shah",
      email: "kavita@diamondhouse.com",
      phone: "+91-9876543211",
      location: "Surat, Gujarat",
      rating: 4.9,
    },
  ]);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editSupplier, setEditSupplier] = useState(null);
  const [showOrders, setShowOrders] = useState(false);

  const handleAddSupplier = () => {
    setEditSupplier(null);
    setShowForm(true);
  };

  const handleEdit = (supplier) => {
    setEditSupplier(supplier);
    setShowForm(true);
  };

  const handleOrders = () => {
    setShowOrders(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const newSupplier = {
      id: editSupplier ? editSupplier.id : suppliers.length + 1,
      name: form.get("name"),
      category: form.get("category"),
      status: form.get("status"),
      contactPerson: form.get("contactPerson"),
      email: form.get("email"),
      phone: form.get("phone"),
      location: form.get("location"),
      rating: parseFloat(form.get("rating")),
    };

    if (editSupplier) {
      setSuppliers(
        suppliers.map((s) => (s.id === editSupplier.id ? newSupplier : s))
      );
    } else {
      setSuppliers([...suppliers, newSupplier]);
    }
    setShowForm(false);
  };

  const filteredSuppliers = suppliers.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="suppliers-container">
      <div className="suppliers-header">
        <h1>Suppliers</h1>
        <p>Manage your supplier relationships</p>
        <button className="add-btn" onClick={handleAddSupplier}>
          <FaPlus /> Add Supplier
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search suppliers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Supplier List */}
      <div className="suppliers-list">
        {filteredSuppliers.map((supplier) => (
          <div className="supplier-card" key={supplier.id}>
            <div className="supplier-info">
              <div className="supplier-logo">🏢</div>
              <div className="supplier-details">
                <h2>{supplier.name}</h2>
                <span className="status">{supplier.status}</span>
                <span className="category">{supplier.category}</span>
                <p>
                  Contact Person: <strong>{supplier.contactPerson}</strong>
                </p>
                <div className="rating">
                  <FaStar className="star-icon" />{" "}
                  <strong>{supplier.rating}/5.0</strong>
                </div>
                <div className="contact">
                  <p><FaEnvelope /> {supplier.email}</p>
                  <p><FaPhone /> {supplier.phone}</p>
                  <p><FaMapMarkerAlt /> {supplier.location}</p>
                </div>
              </div>
            </div>
            <div className="supplier-actions">
              <button className="edit-btn" onClick={() => handleEdit(supplier)}>
                <FaEdit /> Edit
              </button>
              <button className="orders-btn" onClick={handleOrders}>
                <FaBox /> Orders
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editSupplier ? "Edit Supplier" : "Add Supplier"}</h2>
            <form onSubmit={handleFormSubmit}>
              <input name="name" placeholder="Supplier Name" defaultValue={editSupplier?.name || ""} required />
              <input name="category" placeholder="Category" defaultValue={editSupplier?.category || ""} required />
              <input name="status" placeholder="Status" defaultValue={editSupplier?.status || ""} required />
              <input name="contactPerson" placeholder="Contact Person" defaultValue={editSupplier?.contactPerson || ""} required />
              <input name="email" type="email" placeholder="Email" defaultValue={editSupplier?.email || ""} required />
              <input name="phone" placeholder="Phone" defaultValue={editSupplier?.phone || ""} required />
              <input name="location" placeholder="Location" defaultValue={editSupplier?.location || ""} required />
              <input name="rating" type="number" step="0.1" placeholder="Rating" defaultValue={editSupplier?.rating || ""} required />
              <div className="form-actions">
                <button type="submit">{editSupplier ? "Update" : "Add"}</button>
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Orders Modal */}
      {showOrders && (
        <div className="modal">
          <div className="modal-content">
            <h2>Supplier Orders</h2>
            <p>📦 Orders will be displayed here...</p>
            <button onClick={() => setShowOrders(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;




