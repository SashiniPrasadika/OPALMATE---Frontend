import React, { useState, useEffect } from "react";
import "./RawMaterials.css";
import {
  getRawMaterials,
  addRawMaterial,
  updateRawMaterial,
  deleteRawMaterial,
} from "../api/rawmaterials";

const RawMaterials = () => {
  const [materials, setMaterials] = useState([]);
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

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const { data } = await getRawMaterials();
      setMaterials(data);
    } catch (err) {
      console.error("Error fetching materials:", err);
    }
  };

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (editingMaterial) {
        await updateRawMaterial(editingMaterial.material_id, formData);
      } else {
        await addRawMaterial(formData);
      }
      fetchMaterials();
      setShowForm(false);
      setEditingMaterial(null);
    } catch (err) {
      console.error("Error saving material:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this material?")) {
      try {
        await deleteRawMaterial(id);
        fetchMaterials();
      } catch (err) {
        console.error("Error deleting material:", err);
      }
    }
  };

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

      <div className="search-box">
        <input
          type="text"
          placeholder="Search materials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="materials-list">
        {filteredMaterials.map((mat) => (
          <div className="material-card" key={mat.material_id}>
            <div className="material-info">
              <h3>{mat.name}</h3>
              <span className={`status ${mat.status === "In Stock" ? "in-stock" : "low-stock"}`}>
                {mat.status}
              </span>
              <p><strong>Category:</strong> {mat.category}</p>
              <p><strong>Quantity:</strong> {mat.quantity}</p>
              <p><strong>Supplier:</strong> {mat.supplier}</p>
              <p><strong>Cost per unit:</strong> ₹{mat.cost}</p>
              <small>Last updated: {mat.last_updated}</small>
            </div>
            <div className="material-actions">
              <button onClick={() => openForm(mat)}>Edit</button>
              <button onClick={() => handleDelete(mat.material_id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editingMaterial ? "Edit Material" : "Add Material"}</h3>
            <input type="text" name="name" placeholder="Material Name" value={formData.name} onChange={handleChange} />
            <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
            <input type="text" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} />
            <input type="text" name="supplier" placeholder="Supplier" value={formData.supplier} onChange={handleChange} />
            <input type="number" name="cost" placeholder="Cost per unit" value={formData.cost} onChange={handleChange} />
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
