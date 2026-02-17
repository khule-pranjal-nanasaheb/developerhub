// src/components/ProjectForm.jsx
import React, { useState } from "react";
import projectService from "../services/projectService";

const ProjectForm = ({ onSaved, onCancel, initial = null }) => {
  const [form, setForm] = useState({
    name: initial?.name || "",
    description: initial?.description || "",
    deadline: initial?.deadline ? initial.deadline.split("T")[0] : "",
    status: initial?.status || "NEW",
  });
  const [saving, setSaving] = useState(false);
  const statuses = ["NEW", "IN_PROGRESS", "COMPLETED", "ON_HOLD"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Deadline needs to be in YYYY-MM-DD -> backend will convert to LocalDate
      await projectService.createProject(form);
      setSaving(false);
      if (onSaved) onSaved();
    } catch (err) {
      console.error("Save project error:", err);
      alert("Failed to save project. See console.");
      setSaving(false);
    }
  };

  return (
    <div className="project-form-card card p-4 shadow-sm">
      <h4 className="mb-3">➕Add New Project</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Project Name</label>
          <input
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Project name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Short description"
            rows={4}
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Deadline</label>
            <input
              className="form-control"
              name="deadline"
              type="date"
              value={form.deadline}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success flex-grow-1" disabled={saving}>
            {saving ? "Saving..." : "Save Project"}
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
