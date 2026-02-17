import React, { useState } from "react";
import FileService from "../services/FileService";

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [targetType, setTargetType] = useState(""); // "project" or "task"
  const [targetId, setTargetId] = useState(""); // projectId or taskId
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !targetType || !targetId) {
      alert("Please select file, target type, and target ID.");
      return;
    }

    try {
      setLoading(true);
      let response;
      if (targetType === "project") {
        response = await FileService.uploadFileToProject(targetId, file);
      } else if (targetType === "task") {
        response = await FileService.uploadFileToTask(targetId, file);
      }
      setFile(null);
      setTargetId("");
      setTargetType("");
      if (onUploadSuccess) onUploadSuccess();
      alert(`✅ File uploaded: ${response.data.fileName}`);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("❌ File upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <h3 className="text-lg font-semibold mb-2">📤 Upload File</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full border p-2 rounded"
        />

        <select
          value={targetType}
          onChange={(e) => setTargetType(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Select Target --</option>
          <option value="project">Project</option>
          <option value="task">Task</option>
        </select>

        <input
          type="number"
          placeholder="Enter Project/Task ID"
          value={targetId}
          onChange={(e) => setTargetId(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="btn btn-success"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
