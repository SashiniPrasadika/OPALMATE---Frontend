// src/components/Employees.jsx
import React, { useEffect, useState } from "react";
import "./Employees.css";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../api/employees";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
    email: "",
    phone: "",
    joining_date: "",
    is_active: 1, // numeric 1 = active, 0 = inactive
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      // assume res.data is an array of employees with fields like employee_id, joining_date, is_active
      setEmployees(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // ensure is_active is numeric
    if (name === "is_active") {
      setFormData((p) => ({ ...p, [name]: Number(value) }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingEmployee(null);
    setFormData({
      name: "",
      role: "",
      department: "",
      email: "",
      phone: "",
      joining_date: "",
      is_active: 1,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // debug log - always good to inspect what we're sending
      const idToUse = editingEmployee
        ? editingEmployee.employee_id ?? editingEmployee.id
        : null;
      console.log("Submitting employee:", { id: idToUse, payload: formData });

      if (editingEmployee) {
        if (!idToUse) {
          console.error("No valid employee id when updating:", editingEmployee);
          return;
        }
        await updateEmployee(idToUse, formData);
      } else {
        await addEmployee(formData);
      }

      await fetchEmployees();
      resetForm();
    } catch (err) {
      console.error("Error saving employee:", err);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      name: employee.name ?? "",
      role: employee.role ?? "",
      department: employee.department ?? "",
      email: employee.email ?? "",
      phone: employee.phone ?? "",
      joining_date: employee.joining_date ?? employee.joined ?? "",
      // if backend returns is_active as 1/0 use that; if frontend used "status", convert:
      is_active:
        typeof employee.is_active !== "undefined"
          ? Number(employee.is_active)
          : employee.status === "Active"
          ? 1
          : 0,
    });
    setShowForm(true);
  };

  const handleView = (employee) => {
    alert(
      `Name: ${employee.name}\nRole: ${employee.role}\nDepartment: ${employee.department}\nEmail: ${employee.email}\nPhone: ${employee.phone}\nJoined: ${employee.joining_date ?? employee.joined}\nActive: ${
        employee.is_active ? "Yes" : "No"
      }`
    );
  };

  const handleDelete = async (employee) => {
    // accept either id number or employee object
    const idToUse =
      typeof employee === "number" ? employee : employee.employee_id ?? employee.id;

    if (!idToUse) {
      console.error("No valid id to delete:", employee);
      return;
    }

    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(idToUse);
        fetchEmployees();
      } catch (err) {
        console.error("Error deleting employee:", err);
      }
    }
  };

  return (
    <div className="employees-container">
      <div className="employees-header">
        <div className="header-text">
          <h2>Employees</h2>
          <p className="description">Manage your team members and staff</p>
        </div>
      </div>

      <button className="add-btn" onClick={() => setShowForm(true)}>
        + Add Employee
      </button>

      <input type="text" className="search-bar" placeholder="Search employees..." />

      <div className="employee-list">
        {employees.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          employees.map((employee) => {
            const key = employee.employee_id ?? employee.id;
            return (
              <div className="employee-card" key={key}>
                <div className="employee-info">
                  <h3>
                    {employee.name}{" "}
                    <span className={`status ${employee.is_active ? "active" : "inactive"}`}>
                      {employee.is_active ? "Active" : "Inactive"}
                    </span>
                  </h3>
                  <p>Role: {employee.role}</p>
                  <p>Department: {employee.department}</p>
                  <p>
                    Email: {employee.email} | Phone: {employee.phone}
                  </p>
                  <p>Joined: {employee.joining_date ?? employee.joined}</p>
                </div>

                <div className="employee-actions">
                  <button className="edit-btn" onClick={() => handleEdit(employee)}>
                    Edit
                  </button>
                  <button className="view-btn" onClick={() => handleView(employee)}>
                    View
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(employee)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {showForm && (
        <div className="form-popup">
          <form onSubmit={handleSubmit} className="employee-form">
            <h3>{editingEmployee ? "Edit Employee" : "Add Employee"}</h3>
            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input name="role" placeholder="Role" value={formData.role} onChange={handleChange} required />
            <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
            <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
            <input name="joining_date" type="date" value={formData.joining_date} onChange={handleChange} required />
            <select name="is_active" value={formData.is_active} onChange={handleChange}>
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>

            <div className="form-actions">
              <button type="submit" className="save-btn">
                {editingEmployee ? "Update" : "Add"}
              </button>
              <button type="button" className="cancel-btn" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Employees;
