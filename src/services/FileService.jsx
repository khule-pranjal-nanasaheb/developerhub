import axios from "axios";

const API_URL = "http://localhost:8080/api/files";

class FileService {
  // 📌 Upload file to a Project
  uploadFileToProject(projectId, file) {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post(`${API_URL}/project/${projectId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  // 📌 Upload file to a Task
  uploadFileToTask(taskId, file) {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post(`${API_URL}/task/${taskId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  // 📌 Get files for a Project
  getFilesForProject(projectId) {
    return axios.get(`${API_URL}/project/${projectId}`);
  }

  // 📌 Get files for a Task
  getFilesForTask(taskId) {
    return axios.get(`${API_URL}/task/${taskId}`);
  }

  // 📌 Download a file by ID
  downloadFile(fileId, fileName) {
    return axios({
      url: `${API_URL}/download/${fileId}`,
      method: "GET",
      responseType: "blob", // important for file downloads
    }).then((response) => {
      // Create a link to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName || "file");
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  }

  // 📌 Delete a file by ID
  deleteFile(fileId) {
    return axios.delete(`${API_URL}/${fileId}`);
  }
}

export default new FileService();
