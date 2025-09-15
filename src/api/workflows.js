import axios from "axios";

const API_URL = "http://localhost:5000/workflows";

export const getworkflowss = () => axios.get(API_URL);

export const addworkflows = (workflowsData) => axios.post(API_URL, workflowsData);

export const updateworkflows = (id, workflowsData) =>
  axios.put(`${API_URL}/${id}`, workflowsData);

export const deleteworkflows = (id) => axios.delete(`${API_URL}/${id}`);
