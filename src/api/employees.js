// src/api/employees.js
import axios from "axios";

const API_URL = "http://localhost:5000/employees";

// Get all employees
export const getEmployees = () => axios.get(API_URL);

// Add a new employee
export const addEmployee = (employeeData) => axios.post(API_URL, employeeData);

// Update an existing employee
export const updateEmployee = (id, employeeData) =>
  axios.put(`${API_URL}/${id}`, employeeData);

// Delete an employee
export const deleteEmployee = (id) => axios.delete(`${API_URL}/${id}`);
