// src/services/TaskService.js
import axios from "axios";

const API_URL = "http://localhost:8080/tasks"; // adjust if needed

// Get all tasks
export const getTasks = async () => {
  return await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

// Create task
export const createTask = async (task) => {
  return await axios.post(API_URL, task, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

// Update task
export const updateTask = async (id, task) => {
  return await axios.put(`${API_URL}/${id}`, task, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

// Delete task
export const deleteTask = async (id) => {
  return await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
