// src/components/CommentList.jsx
import React, { useEffect, useState } from "react";
import CommentService from "../services/CommentService";

const CommentList = ({ projectId, taskId, refresh }) => {
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    try {
      let data = [];
      if (projectId) {
        data = await CommentService.getProjectComments(projectId);
      } else if (taskId) {
        data = await CommentService.getTaskComments(taskId);
      }
      setComments(data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [projectId, taskId, refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await CommentService.deleteComment(id);
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error deleting comment:", err);
      alert("❌ Failed to delete comment");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString();
  };

  return (
    <div className="mt-4">
      <h5>📝 Comments</h5>
      {comments.length === 0 ? (
        <p className="text-muted">No comments yet.</p>
      ) : (
        <ul className="list-group">
          {comments.map((c) => (
            <li
              key={c.id}
              className="list-group-item d-flex justify-content-between align-items-start"
            >
              <div>
                <strong>{c.author || "Anonymous"}</strong>: {c.content}
                <br />
                <small className="text-muted">{formatDate(c.createdAt)}</small>
              </div>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(c.id)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentList;
