// src/api/api.js
import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "https://patient-management-system-1-8zui.onrender.com/api", // Replace with your actual backend URL
});

// Add a request interceptor to include token in requests (if necessary)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
