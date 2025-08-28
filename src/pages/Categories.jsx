import React, { useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const handleAdd = () => {
    setCategories([...categories, name]);
    setName("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Category Management</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Category name" />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {categories.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
