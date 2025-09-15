import axios from "axios";

const API_URL = "http://localhost:5000/stock-alerts";

// Get all alerts
export const getAlerts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add new alert
export const addAlert = async (alertData) => {
  const response = await axios.post(API_URL, alertData);
  return response.data;
};

// Update alert
export const updateAlert = async (id, alertData) => {
  const response = await axios.put(`${API_URL}/${id}`, alertData);
  return response.data;
};

// Delete alert
export const deleteAlert = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
