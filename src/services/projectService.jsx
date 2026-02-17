import axios from "axios";

const API_URL = "http://localhost:8080/projects";

const projectService = {
  createProject: async (project) => {
    const res = await axios.post(API_URL, project);
    return res.data;
  },

  getAllProjects: async () => {
    const res = await axios.get(API_URL);
    return res.data;
  },

  getProjectById: async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  },

  updateProject: async (id, project) => {
    const res = await axios.put(`${API_URL}/${id}`, project);
    return res.data;
  },

  deleteProject: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  },
};

export default projectService;  // ✅ Now default export
