// src/components/TaskForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTask, updateTask } from "../services/taskService";
import projectService from "../services/projectService";

const TaskForm = ({ onSaved, onCancel, editingTask }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(editingTask ? editingTask.title : "");
  const [description, setDescription] = useState(editingTask ? editingTask.description : "");
  const [status, setStatus] = useState(editingTask ? editingTask.status : "TODO");
  const [projectId, setProjectId] = useState(editingTask ? editingTask.project?.id : "");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const projectsData = await projectService.getAllProjects();
        setProjects(projectsData.data || projectsData || []); // ✅ handle both cases
      } catch (err) {
        console.error("Error fetching projects", err);
        setProjects([]);
      }
    }
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = { title, description, status, projectId: Number(projectId) };

    try {
      if (editingTask) {
        await updateTask(editingTask.id, task);
      } else {
        await createTask(task);
      }

      if (onSaved) {
        onSaved();
      } else {
        navigate("/dashboard"); // ✅ fallback navigation
      }
    } catch (err) {
      console.error("Error saving task", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
      <h5>{editingTask ? "✏️ Edit Task" : "➕ Add Task"}</h5>

      <div className="mb-2">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Status</label>
        <select
          className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Project</label>
        <select
          className="form-select"
          value={projectId}
          onChange={(e) => setProjectId(Number(e.target.value))}
          required
        >
          <option value="">-- Select Project --</option>
          {projects.length > 0 ? (
            projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))
          ) : (
            <option disabled>No projects available</option>
          )}
        </select>
      </div>

      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-secondary me-2"
          onClick={onCancel ? onCancel : () => navigate("/dashboard")}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-success">
          {editingTask ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
