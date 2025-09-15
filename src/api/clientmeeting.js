import axios from "axios";

const API_URL = "http://localhost:5000/client-meetings";

export const getClientMeetings = () => axios.get(API_URL);

export const addClientMeeting = (data) =>
  axios.post(API_URL, {
    client: data.client,
    purpose: data.purpose,
    date: data.date,
    time: data.time,
    status: data.status,
    notes: data.notes || null,
  });

export const updateClientMeeting = (id, data) =>
  axios.put(`${API_URL}/${id}`, {
    client: data.client,
    purpose: data.purpose,
    date: data.date,
    time: data.time,
    status: data.status,
    notes: data.notes || null,
  });

export const deleteClientMeeting = (id) =>
  axios.delete(`${API_URL}/${id}`);
