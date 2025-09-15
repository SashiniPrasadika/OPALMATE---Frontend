import React, { useState, useEffect } from "react";
import "./Workflows.css";
import {
  getworkflowss,
  addworkflows,
  updateworkflows,
  deleteworkflows,
} from "../api/workflows";

const Workflows = () => {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    steps: "",
    status: "Active",
  });

  // Fetch workflows from API
  const fetchWorkflows = async () => {
    try {
      setLoading(true);
      const res = await getworkflowss();
      setWorkflows(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching workflows:", err);
      setError("Failed to load workflows.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        steps: formData.steps
          .split(",")
          .map((step) => step.trim())
          .filter((s) => s.length > 0),
      };

      if (editingWorkflow) {
        await updateworkflows(editingWorkflow.workflow_id, payload);
      } else {
        await addworkflows(payload);
      }

      fetchWorkflows();
      setFormData({ title: "", description: "", steps: "", status: "Active" });
      setEditingWorkflow(null);
      setShowForm(false);
    } catch (err) {
      console.error("Error saving workflow:", err);
      setError("Failed to save workflow.");
    }
  };

  const handleEdit = (workflow) => {
    setEditingWorkflow(workflow);
    setFormData({
      title: workflow.title,
      description: workflow.description,
      steps: workflow.steps.map((s) => s.step_name).join(", "),
      status: workflow.status,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this workflow?")) return;
    try {
      await deleteworkflows(id);
      fetchWorkflows();
    } catch (err) {
      console.error("Error deleting workflow:", err);
      setError("Failed to delete workflow.");
    }
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
        onChange={(e) => {
          const searchTerm = e.target.value.toLowerCase();
          fetchWorkflows(); // re-fetch from backend (or filter client-side if you prefer)
          setWorkflows((prev) =>
            prev.filter((wf) =>
              wf.title.toLowerCase().includes(searchTerm)
            )
          );
        }}
      />

      {loading ? (
        <p className="loading">Loading workflows...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : workflows.length === 0 ? (
        <p className="no-data">No workflows found.</p>
      ) : (
        <div className="cards-container">
          {workflows.map((workflow) => (
            <div className="workflow-card" key={workflow.workflow_id}>
              <div className="workflow-header">
                <h2>{workflow.title}</h2>
                <span className={`status ${workflow.status.toLowerCase()}`}>
                  {workflow.status}
                </span>
              </div>
              <p className="description">{workflow.description}</p>
              <div className="steps">
                {workflow.steps?.map((step, index) => (
                  <span key={step.step_id} className="step">
                    {step.step_name}
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
                  onClick={() => handleDelete(workflow.workflow_id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="status-select"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
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
