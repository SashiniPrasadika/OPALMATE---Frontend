import React, { useState } from "react";
import "./Employees.css";
import employeeIcon from "../assets/employees.png";
import envelopeIcon from "../assets/envelope.png";
import phoneIcon from "../assets/phone-call.png";

const Employees = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Senior Craftsman",
      department: "Production",
      email: "rajesh@ishara.com",
      phone: "+91-9876543210",
      status: "Active",
      joined: "2020-03-15",
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Sales Manager",
      department: "Sales",
      email: "priya@ishara.com",
      phone: "+91-9876543211",
      status: "Active",
      joined: "2019-07-22",
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Accountant",
      department: "Finance",
      email: "amit@ishara.com",
      phone: "+91-9876543212",
      status: "Active",
      joined: "2021-01-12",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
    email: "",
    phone: "",
    status: "Active",
    joined: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEmployee) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editingEmployee.id ? { ...editingEmployee, ...formData } : emp
        )
      );
    } else {
      setEmployees([...employees, { id: Date.now(), ...formData }]);
    }
    setShowForm(false);
    setEditingEmployee(null);
    setFormData({
      name: "",
      role: "",
      department: "",
      email: "",
      phone: "",
      status: "Active",
      joined: "",
    });
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormData(employee);
    setShowForm(true);
  };

  const handleView = (employee) => {
    alert(`
      Name: ${employee.name}
      Role: ${employee.role}
      Department: ${employee.department}
      Email: ${employee.email}
      Phone: ${employee.phone}
      Status: ${employee.status}
      Joined: ${employee.joined}
    `);
  };

  return (
    <div className="employees-container">
      <div className="employees-header">
        <h2>Employees</h2>
        <p>Manage your team members and staff</p>
        <button className="add-btn" onClick={() => setShowForm(true)}>+ Add Employee</button>
      </div>

      {/* Search bar */}
      <input type="text" className="search-bar" placeholder="Search employees..." />

      {/* Employee List */}
      <div className="employee-list">
        {employees.map((employee) => (
          <div className="employee-card" key={employee.id}>
            <div className="employee-info">
              <img src={employeeIcon} alt="employee" className="employee-avatar" />
              <div>
                <h3>
                  {employee.name} <span className="status">{employee.status}</span>
                </h3>
                <p>Role: {employee.role}</p>
                <p>Department: {employee.department}</p>
                <p>
                  <img src={envelopeIcon} alt="email" className="icon" /> {employee.email} |
                  <img src={phoneIcon} alt="phone" className="icon" /> {employee.phone}
                </p>
                <p>Joined: {employee.joined}</p>
              </div>
            </div>
            <div className="employee-actions">
              <button onClick={() => handleEdit(employee)}>Edit</button>
              <button onClick={() => handleView(employee)}>View</button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="form-popup">
          <form onSubmit={handleSubmit} className="employee-form">
            <h3>{editingEmployee ? "Edit Employee" : "Add Employee"}</h3>
            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input name="role" placeholder="Role" value={formData.role} onChange={handleChange} required />
            <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
            <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
            <input name="joined" type="date" value={formData.joined} onChange={handleChange} required />
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div className="form-actions">
              <button type="submit">{editingEmployee ? "Update" : "Add"}</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Employees;
