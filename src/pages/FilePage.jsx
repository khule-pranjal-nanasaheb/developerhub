import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";

const FilePage = () => {
  const [refresh, setRefresh] = useState(false);
  const [targetType, setTargetType] = useState("");
  const [targetId, setTargetId] = useState("");

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">📁 File Management</h2>

      <FileUpload onUploadSuccess={handleRefresh} />

      <div className="my-4">
        <select
          value={targetType}
          onChange={(e) => setTargetType(e.target.value)}
          className="border p-2 rounded mr-2"
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
          className="border p-2 rounded"
        />
      </div>

      <FileList
        targetType={targetType}
        targetId={targetId}
        key={refresh} // ensures refresh after upload/delete
      />
    </div>
  );
};

export default FilePage;
