// src/services/reportService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/reports";

// Generate report for a project
export const generateReport = async (projectId) => {
  const response = await axios.post(`${API_URL}/generate/${projectId}`);
  return response.data;
};

// Get all reports
export const getAllReports = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get timeline report for a project
export const getTimelineReport = async (projectId) => {
  const response = await axios.get(`${API_URL}/timeline/${projectId}`);
  return response.data;
};

// ❌ Delete a report
export const deleteReport = async (reportId) => {
  const response = await axios.delete(`${API_URL}/${reportId}`);
  return response.data;
};
