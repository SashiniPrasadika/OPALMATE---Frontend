import axios from "axios";

const API_URL = "http://localhost:5000/customers";

export const getCustomers = () => axios.get(API_URL);

export const addCustomer = (customerData) => axios.post(API_URL, customerData);

export const updateCustomer = (id, customerData) =>
  axios.put(`${API_URL}/${id}`, customerData);

export const deleteCustomer = (id) => axios.delete(`${API_URL}/${id}`);
