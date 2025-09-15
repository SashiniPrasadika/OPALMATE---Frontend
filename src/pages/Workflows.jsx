import React, { useState } from "react";
import "./Workflows.css";

const Workflows = () => {
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      title: "Custom Ring Creation",
      description: "Complete workflow for custom ring orders",
      steps: [
        "Design Consultation",
        "Material Selection",
        "3D Modeling",
        "Approval",
        "Crafting",
        "Quality Check",
        "Delivery",
      ],
      status: "Active",
    },
    {
      id: 2,
      title: "Necklace Production",
      description: "Standard necklace manufacturing process",
      steps: [
        "Design",
        "Sourcing",
        "Crafting",
        "Stone Setting",
        "Polishing",
        "Quality Control",
      ],
      status: "Active",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    steps: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingWorkflow) {
      setWorkflows(
        workflows.map((wf) =>
          wf.id === editingWorkflow.id
            ? { ...wf, ...formData, steps: formData.steps.split(",") }
            : wf
        )
      );
      setEditingWorkflow(null);
    } else {
      const newWorkflow = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        steps: formData.steps.split(","),
        status: "Active",
      };
      setWorkflows([...workflows, newWorkflow]);
    }
    setFormData({ title: "", description: "", steps: "" });
    setShowForm(false);
  };

  const handleEdit = (workflow) => {
    setEditingWorkflow(workflow);
    setFormData({
      title: workflow.title,
      description: workflow.description,
      steps: workflow.steps.join(","),
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setWorkflows(workflows.filter((wf) => wf.id !== id));
  };

  return (
    <div className="workflows-container">
      <div className="header">
        <h1>Workflows</h1>
        
        <p>Manage jewelry creation and service workflows</p>
        <button className="create-btn" onClick={() => setShowForm(true)}>
          + Create Workflow
        </button>
      </div>

      <input
        type="text"
        placeholder="Search workflows..."
        className="search-bar"
      />

      <div className="cards-container">
        {workflows.map((workflow) => (
          <div className="workflow-card" key={workflow.id}>
            <div className="workflow-header">
              <h2>{workflow.title}</h2>
              <span className={`status ${workflow.status.toLowerCase()}`}>
                {workflow.status}
              </span>
            </div>
            <p className="description">{workflow.description}</p>
            <div className="steps">
              {workflow.steps.map((step, index) => (
                <span key={index} className="step">
                  {step}
                  {index < workflow.steps.length - 1 && " → "}
                </span>
              ))}
            </div>
            <div className="actions">
              <button
                className="action-btn edit-btn"
                onClick={() => handleEdit(workflow)}
              >
                Edit
              </button>
              <button
                className="action-btn delete-btn"
                onClick={() => handleDelete(workflow.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{editingWorkflow ? "Edit Workflow" : "Create Workflow"}</h3>
            <input
              type="text"
              name="title"
              placeholder="Workflow Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="steps"
              placeholder="Steps (comma separated)"
              value={formData.steps}
              onChange={handleChange}
              required
            />
            <div className="form-buttons">
              <button type="submit" className="save-btn" onClick={handleSubmit}>
                {editingWorkflow ? "Update" : "Save"}
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workflows;


