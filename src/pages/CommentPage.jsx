// src/pages/CommentPage.jsx
import React, { useState } from "react";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

const CommentPage = () => {
  const [refresh, setRefresh] = useState(false);
  const [projectId, setProjectId] = useState("");
  const [taskId, setTaskId] = useState("");

  const handleCommentAdded = (type, id) => {
    if (type === "project") {
      setProjectId(id);
      setTaskId(""); // clear taskId
    } else if (type === "task") {
      setTaskId(id);
      setProjectId(""); // clear projectId
    }
    setRefresh(!refresh); // trigger reload
  };

  return (
    <div className="container mt-4 p-4 bg-light rounded shadow-sm">
      <h3>💬 Comment Module</h3>

      <CommentForm onCommentAdded={handleCommentAdded} />

      <hr />

      {projectId && (
        <CommentList projectId={projectId} refresh={refresh} />
      )}
      {taskId && <CommentList taskId={taskId} refresh={refresh} />}
    </div>
  );
};

export default CommentPage;
