// src/services/CommentService.jsx
import axios from "axios";

const API_URL = "http://localhost:8080/api/comments";

class CommentService {
  // ✅ Get all comments for a project
  async getProjectComments(projectId) {
    const response = await axios.get(`${API_URL}/project/${projectId}`);
    return response.data;
  }

  // ✅ Get all comments for a task
  async getTaskComments(taskId) {
    const response = await axios.get(`${API_URL}/task/${taskId}`);
    return response.data;
  }

  // ✅ Add comment to a project
  async addCommentToProject(projectId, comment) {
    const response = await axios.post(`${API_URL}/project/${projectId}`, comment);
    return response.data;
  }

  // ✅ Add comment to a task
  async addCommentToTask(taskId, comment) {
    const response = await axios.post(`${API_URL}/task/${taskId}`, comment);
    return response.data;
  }

  // ✅ Delete comment by ID
  async deleteComment(id) {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
}

// 🚀 Export single instance
export default new CommentService();
