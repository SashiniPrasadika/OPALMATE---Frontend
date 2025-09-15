import axios from "axios";

const API_URL = "http://localhost:5000/schedules";

// Get all schedules
export const getSchedules = () => axios.get(API_URL);

// Add a new schedule
export const addSchedule = (data) =>
  axios.post(API_URL, {
    title: data.title,
    time: data.time,   // must match backend column
    color: data.color,
  });

// Update a schedule
export const updateSchedule = (id, data) =>
  axios.put(`${API_URL}/${id}`, {
    title: data.title,
    time: data.time,
    color: data.color,
  });

// Delete a schedule
export const deleteSchedule = (id) => axios.delete(`${API_URL}/${id}`);
