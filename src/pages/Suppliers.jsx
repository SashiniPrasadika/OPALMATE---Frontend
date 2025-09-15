import React, { useEffect, useState } from "react";
import "./Suppliers.css";
import { getSuppliers, addSupplier, updateSupplier, deleteSupplier } from "../api/suppliers";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editSupplier, setEditSupplier] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    status: "Active",
    contactPerson: "",
    email: "",
    phone: "",
    location: "",
    rating: "",
  });

  // Fetch suppliers from backend
  const fetchSuppliers = async () => {
    try {
      const { data } = await getSuppliers();
      setSuppliers(data);
    } catch (err) {
      console.error("Failed to fetch suppliers:", err);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open Add form
  const handleAddSupplier = () => {
    setEditSupplier(null);
    setFormData({
      name: "",
      category: "",
      status: "Active",
      contactPerson: "",
      email: "",
      phone: "",
      location: "",
      rating: "",
    });
    setShowForm(true);
  };

  // Open Edit form
  const handleEdit = (supplier) => {
    setEditSupplier(supplier);
    setFormData({
      name: supplier.supplier_name,
      category: supplier.category,
      status: supplier.status,
      contactPerson: supplier.contact_person,
      email: supplier.email,
      phone: supplier.phone,
      location: supplier.location,
      rating: supplier.rating,
    });
    setShowForm(true);
  };

  // Delete supplier
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        await deleteSupplier(id);
        fetchSuppliers();
      } catch (err) {
        console.error("Failed to delete supplier:", err);
      }
    }
  };

  // View supplier details
  const handleView = (supplier) => {
    alert(`
Name: ${supplier.supplier_name}
Category: ${supplier.category}
Status: ${supplier.status}
Contact Person: ${supplier.contact_person}
Email: ${supplier.email}
Phone: ${supplier.phone}
Location: ${supplier.location}
Rating: ${supplier.rating}/5.0
    `);
  };

  // Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const supplierPayload = {
        supplier_name: formData.name,
        category: formData.category,
        status: formData.status,
        contact_person: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        rating: parseFloat(formData.rating),
      };

      if (editSupplier) {
        await updateSupplier(editSupplier.supplier_id, supplierPayload);
      } else {
        await addSupplier(supplierPayload);
      }

      // Refresh list
      fetchSuppliers();
      setShowForm(false);
      setEditSupplier(null);
    } catch (err) {
      console.error("Error saving supplier:", err);
      alert("Failed to save supplier. Check console for details.");
    }
  };

  // Filter suppliers by search
  const filteredSuppliers = suppliers.filter((s) =>
    s.supplier_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="suppliers-container">
      <div className="suppliers-header">
        <h1>Suppliers</h1>
        <p>Manage your supplier relationships</p>
        <button className="add-btn" onClick={handleAddSupplier}>
          Add Supplier
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search suppliers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Supplier Cards */}
      <div className="suppliers-list">
        {filteredSuppliers.map((supplier) => (
          <div className="supplier-card" key={supplier.supplier_id}>
            <div className="supplier-details">
              <h2>
                {supplier.supplier_name}{" "}
                <span className={`status ${supplier.status.toLowerCase()}`}>
                  {supplier.status}
                </span>
              </h2>
              <span className="category">{supplier.category}</span>
              <p>
                Contact Person: <strong>{supplier.contact_person}</strong>
              </p>
              <p>Email: {supplier.email}</p>
              <p>Phone: {supplier.phone}</p>
              <p>Location: {supplier.location}</p>
              <p>
                Rating: <strong>{supplier.rating}/5.0</strong>
              </p>
            </div>
            <div className="supplier-actions">
              <button className="edit-btn" onClick={() => handleEdit(supplier)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(supplier.supplier_id)}
              >
                Delete
              </button>
              <button className="view-btn" onClick={() => handleView(supplier)}>
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editSupplier ? "Edit Supplier" : "Add Supplier"}</h2>
            <form onSubmit={handleFormSubmit}>
              <input
                name="name"
                placeholder="Supplier Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                required
              />
              <input
                name="status"
                placeholder="Status"
                value={formData.status}
                onChange={handleChange}
                required
              />
              <input
                name="contactPerson"
                placeholder="Contact Person"
                value={formData.contactPerson}
                onChange={handleChange}
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <input
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                required
              />
              <input
                name="rating"
                type="number"
                step="0.1"
                placeholder="Rating"
                value={formData.rating}
                onChange={handleChange}
                required
              />
              <div className="form-actions">
                <button type="submit" className="save-btn">
                  {editSupplier ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;

