import React, { useState } from "react";
import { FaSearch, FaGem, FaPlus } from "react-icons/fa";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([
    {
      id: "DER-001",
      name: "Diamond Engagement Ring",
      category: "Ring",
      price: 125000,
      stock: 5,
      status: "Active",
    },
    {
      id: "GNS-002",
      name: "Gold Necklace Set",
      category: "Necklace",
      price: 85000,
      stock: 12,
      status: "Active",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "Active",
  });

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    setFormData({
      id: "",
      name: "",
      category: "",
      price: "",
      stock: "",
      status: "Active",
    });
    setEditingProduct(null);
    setFormVisible(true);
  };

  // Handle Edit
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setFormVisible(true);
  };

  const handleSave = () => {
    if (editingProduct) {
      setProducts(
        products.map((p) => (p.id === editingProduct.id ? formData : p))
      );
    } else {
      setProducts([...products, { ...formData, id: `SKU-${Date.now()}` }]);
    }
    setFormVisible(false);
  };

  const handleView = (product) => {
    setViewingProduct(product);
  };

  const closeView = () => {
    setViewingProduct(null);
  };

  return (
    <div className="products-container">
      <div className="products-header">
        <h2>Products</h2>
        <p>Manage your jewelry product inventory</p>
        <button className="add-btn" onClick={handleAddProduct}>
          <FaPlus /> Add Product
        </button>
      </div>

      <div className="search-box">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="products-list">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-icon">
              <FaGem />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <span className="status">{product.status}</span>
              <p>SKU: {product.id}</p>
              <p>Category: {product.category}</p>
              <p>
                Price: <strong>₹{product.price.toLocaleString()}</strong>
              </p>
              <p>
                Stock: <strong>{product.stock} units</strong>
              </p>
            </div>
            <div className="product-actions">
              <button onClick={() => handleEdit(product)}>Edit</button>
              <button onClick={() => handleView(product)}>View</button>
            </div>
          </div>
        ))}
      </div>

      {formVisible && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editingProduct ? "Edit Product" : "Add Product"}</h3>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
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
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div className="form-actions">
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setFormVisible(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {viewingProduct && (
        <div className="modal">
          <div className="modal-content">
            <h3>{viewingProduct.name}</h3>
            <p>SKU: {viewingProduct.id}</p>
            <p>Category: {viewingProduct.category}</p>
            <p>Price: ₹{viewingProduct.price.toLocaleString()}</p>
            <p>Stock: {viewingProduct.stock} units</p>
            <p>Status: {viewingProduct.status}</p>
            <button onClick={closeView}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

