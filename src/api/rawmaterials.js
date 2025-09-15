import axios from "axios";

const API_URL = "http://localhost:5000/rawmaterials";


export const getRawMaterials = () => axios.get(API_URL);
export const addRawMaterial = (data) => axios.post(API_URL, data);
export const updateRawMaterial = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteRawMaterial = (id) => axios.delete(`${API_URL}/${id}`);
