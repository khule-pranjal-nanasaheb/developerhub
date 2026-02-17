// src/components/Dashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [refreshProjects, setRefreshProjects] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const onProjectSaved = () => {
    setShowProjectForm(false);
    setRefreshProjects((r) => r + 1);
  };

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">📊 ProjectHub Dashboard</h2>
          <small className="text-muted">Manage projects, tasks & reports</small>
        </div>
        <div>
          <button
            className="btn btn-success me-2"
            onClick={() => setShowProjectForm((s) => !s)}
          >
            ➕ {showProjectForm ? "Close Project Form" :"Add Project"}
          </button>
          <button
            className="btn btn-warning me-2"
            onClick={() => navigate("/tasks")}   
          >
            📝Add Tasks
          </button>
          <button
            className="btn btn-info me-2"
            onClick={() => navigate("/reports")}
          >
            📑Reports
          </button>
          <button
            className="btn btn-secondary me-2"
            onClick={() => navigate("/comments")}
          >
            💬Add Comments
          </button>
          <button
            className="btn btn-dark me-2"
            onClick={() => navigate("/files")}
          >
            📁Files
          </button>
          <button className="btn btn-primary" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Project Section */}
      {showProjectForm && (
        <div className="mb-4">
          <ProjectForm
            onSaved={onProjectSaved}
            onCancel={() => setShowProjectForm(false)}
          />
        </div>
      )}

      <ProjectList refreshSignal={refreshProjects} />
    </div>
  );
};

export default Dashboard;
