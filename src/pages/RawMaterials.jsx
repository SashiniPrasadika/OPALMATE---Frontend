import React, { useState } from "react";
import "./RawMaterials.css";

const RawMaterials = () => {
  const [materials, setMaterials] = useState([
    {
      id: 1,
      name: "24K Gold",
      category: "Precious Metal",
      quantity: "125.5 grams",
      supplier: "Gold Supplier Ltd",
      cost: 4500,
      status: "In Stock",
      lastUpdated: "1/15/2024",
    },
    {
      id: 2,
      name: "Diamonds - Round Cut",
      category: "Gemstone",
      quantity: "25 pieces",
      supplier: "Diamond House",
      cost: 85000,
      status: "In Stock",
      lastUpdated: "1/14/2024",
    },
    {
      id: 3,
      name: "Silver Wire",
      category: "Metal",
      quantity: "8 meters",
      supplier: "Metal Works",
      cost: 350,
      status: "Low Stock",
      lastUpdated: "1/12/2024",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    supplier: "",
    cost: "",
    status: "In Stock",
  });

  // ✅ Open Add/Edit Form
  const openForm = (material = null) => {
    if (material) {
      setEditingMaterial(material);
      setFormData(material);
    } else {
      setEditingMaterial(null);
      setFormData({
        name: "",
        category: "",
        quantity: "",
        supplier: "",
        cost: "",
        status: "In Stock",
      });
    }
    setShowForm(true);
  };

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Save Material (Add or Edit)
  const handleSave = () => {
    if (editingMaterial) {
      setMaterials(
        materials.map((mat) =>
          mat.id === editingMaterial.id ? { ...formData, id: mat.id } : mat
        )
      );
    } else {
      setMaterials([
        ...materials,
        { ...formData, id: Date.now(), lastUpdated: new Date().toLocaleDateString() },
      ]);
    }
    setShowForm(false);
  };

  // ✅ Simulate Reorder
  const handleReorder = (id) => {
    alert("Reorder request placed for material ID: " + id);
  };

  // ✅ Filtered List
  const filteredMaterials = materials.filter((mat) =>
    mat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="raw-container">
      <div className="raw-header">
        <h2>Raw Materials</h2>
        <p>Manage your inventory of raw materials</p>
        <button className="add-btn" onClick={() => openForm()}>+ Add Material</button>
      </div>

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search materials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* List */}
      <div className="materials-list">
        {filteredMaterials.map((mat) => (
          <div className="material-card" key={mat.id}>
            <div className="material-info">
              <h3>{mat.name}</h3>
              <span className={`status ${mat.status === "In Stock" ? "in-stock" : "low-stock"}`}>
                {mat.status}
              </span>
              <p><strong>Category:</strong> {mat.category}</p>
              <p><strong>Quantity:</strong> {mat.quantity}</p>
              <p><strong>Supplier:</strong> {mat.supplier}</p>
              <p><strong>Cost per unit:</strong> ₹{mat.cost}</p>
              <small>Last updated: {mat.lastUpdated}</small>
            </div>
            <div className="material-actions">
              <button onClick={() => openForm(mat)}>Edit</button>
              <button onClick={() => handleReorder(mat.id)}>Reorder</button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editingMaterial ? "Edit Material" : "Add Material"}</h3>
            <input
              type="text"
              name="name"
              placeholder="Material Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
            />
            <input
              type="text"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
            <input
              type="text"
              name="supplier"
              placeholder="Supplier"
              value={formData.supplier}
              onChange={handleChange}
            />
            <input
              type="number"
              name="cost"
              placeholder="Cost per unit"
              value={formData.cost}
              onChange={handleChange}
            />
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
            </select>
            <div className="modal-actions">
              <button onClick={handleSave}>Save</button>
              <button className="cancel" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RawMaterials;
