import React, { useEffect, useState } from "react";
import FileService from "../services/FileService";

const FileList = ({ targetType, targetId }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFiles = async () => {
    if (!targetType || !targetId) return;

    try {
      setLoading(true);
      let response;
      if (targetType === "project") {
        response = await FileService.getFilesForProject(targetId);
      } else if (targetType === "task") {
        response = await FileService.getFilesForTask(targetId);
      }
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      await FileService.deleteFile(id);
      fetchFiles();
    }
  };

  const handleDownload = async (id, fileName) => {
    await FileService.downloadFile(id, fileName);
  };

  useEffect(() => {
    fetchFiles();
  }, [targetType, targetId]);

  if (!targetType || !targetId) {
    return <p className="text-gray-500">Please select target to view files.</p>;
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold mb-3">📂 Files</h3>
      {loading ? (
        <p>Loading...</p>
      ) : files.length === 0 ? (
        <p className="text-gray-500">No files found.</p>
      ) : (
        <ul className="space-y-2">
          {files.map((file) => (
            <li
              key={file.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <span>{file.fileName}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleDownload(file.id, file.fileName)}
                  className="bg-green-600 text-white px-2 py-1 rounded"
                >
                  Download
                </button>
                <button
                  onClick={() => handleDelete(file.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileList;
