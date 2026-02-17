// src/components/CommentForm.jsx
import React, { useState } from "react";
import CommentService from "../services/CommentService";

const CommentForm = ({ onCommentAdded }) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [commentType, setCommentType] = useState("");
  const [projectId, setProjectId] = useState("");
  const [taskId, setTaskId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!author.trim() || !content.trim() || !commentType) {
      alert("⚠️ Please fill all required fields");
      return;
    }

    try {
      let newComment = { author, content };

      if (commentType === "project" && projectId) {
        await CommentService.addCommentToProject(projectId, newComment);
        if (onCommentAdded) onCommentAdded("project", projectId);
      } else if (commentType === "task" && taskId) {
        await CommentService.addCommentToTask(taskId, newComment);
        if (onCommentAdded) onCommentAdded("task", taskId);
      } else {
        alert("❌ Missing Project ID or Task ID");
        return;
      }

      // reset form
      setAuthor("");
      setContent("");
      setCommentType("");
      setProjectId("");
      setTaskId("");
    } catch (err) {
      console.error("Error adding comment:", err);
      alert("❌ Failed to add comment");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h5>Add Comment</h5>

      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <select
          className="form-select"
          value={commentType}
          onChange={(e) => setCommentType(e.target.value)}
        >
          <option value="">-- Select Comment Type --</option>
          <option value="project">Project</option>
          <option value="task">Task</option>
        </select>
      </div>

      {commentType === "project" && (
        <div className="mb-2">
          <input
            type="number"
            className="form-control"
            placeholder="Enter Project ID"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        </div>
      )}

      {commentType === "task" && (
        <div className="mb-2">
          <input
            type="number"
            className="form-control"
            placeholder="Enter Task ID"
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
          />
        </div>
      )}

      <button type="submit" className="btn btn-primary">
        Add Comment
      </button>
    </form>
  );
};

export default CommentForm;
