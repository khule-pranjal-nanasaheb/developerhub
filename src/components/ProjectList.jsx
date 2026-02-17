// src/components/ProjectList.jsx
import React, { useEffect, useState } from "react";
import projectService from "../services/projectService";

const statusBadge = (status) => {
  switch (status) {
    case "COMPLETED":
      return "badge bg-success";
    case "IN_PROGRESS":
      return "badge bg-warning text-dark";
    case "ON_HOLD":
      return "badge bg-danger";
    case "NEW":
    default:
      return "badge bg-secondary";
  }
};

const isOverdue = (deadlineStr) => {
  if (!deadlineStr) return false;
  const today = new Date();
  const deadline = new Date(deadlineStr);
  // compare only date portion
  return deadline < new Date(today.getFullYear(), today.getMonth(), today.getDate());
};

const ProjectList = ({ refreshSignal }) => {
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  useEffect(() => {
    loadProjects();
  }, [refreshSignal]); // when parent signals change reload

  const loadProjects = async () => {
    try {
      const data = await projectService.getAllProjects();
      setProjects(data || []);
    } catch (err) {
      console.error("Error loading projects:", err);
      setProjects([]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await projectService.deleteProject(id);
      await loadProjects();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete");
    }
  };

  const filtered = projects
    .filter((p) =>
      query ? (p.name || "").toLowerCase().includes(query.toLowerCase()) : true
    )
    .filter((p) => (filterStatus === "ALL" ? true : p.status === filterStatus));

  const recent = [...projects].sort((a, b) => (b.id || 0) - (a.id || 0)).slice(0, 5);

  return (
    <div className="project-list">
      <div className="mb-3 d-flex gap-2 flex-wrap">
        <input
          className="form-control"
          placeholder="Search by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ maxWidth: 300 }}
        />
        <select
          className="form-select"
          style={{ maxWidth: 200 }}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="ALL">All statuses</option>
          <option value="NEW">New</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="ON_HOLD">On Hold</option>
        </select>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <h5>Recent Projects</h5>
          <ul className="list-group">
            {recent.length === 0 && <li className="list-group-item">No recent projects</li>}
            {recent.map((r) => (
              <li key={r.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{r.name}</strong>
                  <div className="text-muted small">{r.description}</div>
                </div>
                <span className={statusBadge(r.status)}>{r.status.replace("_", " ")}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-6">
          <h5>Stats</h5>
          <div className="d-flex gap-2">
            <div className="card p-2 flex-fill text-center">
              <div className="h4">{projects.length}</div>
              <div className="small text-muted">Total Projects</div>
            </div>
            <div className="card p-2 flex-fill text-center">
              <div className="h4">{projects.filter((p) => p.status === "COMPLETED").length}</div>
              <div className="small text-muted">Completed</div>
            </div>
            <div className="card p-2 flex-fill text-center">
              <div className="h4">{projects.filter((p) => p.status === "IN_PROGRESS").length}</div>
              <div className="small text-muted">Ongoing</div>
            </div>
            <div className="card p-2 flex-fill text-center">
              <div className="h4">{projects.filter((p) => p.status === "ON_HOLD").length}</div>
              <div className="small text-muted">On Hold</div>
            </div>
          </div>
        </div>
      </div>

      <table className="table table-striped table-bordered">
        <thead className="table-light">
          <tr>
            <th style={{ width: 60 }}>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th style={{ width: 140 }}>Deadline</th>
            <th style={{ width: 120 }}>Status</th>
            <th style={{ width: 120 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No projects found.</td>
            </tr>
          ) : (
            filtered.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td className={isOverdue(p.deadline) ? "text-danger" : ""}>
                  {p.deadline ? new Date(p.deadline).toLocaleDateString() : "-"}
                </td>
                <td>
                  <span className={statusBadge(p.status)}>{p.status.replace("_", " ")}</span>
                </td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
