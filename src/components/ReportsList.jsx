// src/components/reports/ReportsList.jsx
import React, { useEffect, useState } from "react";
import * as ReportService from "../services/ReportService";  // ✅ fixed import path (lowercase)

const ReportsList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectId, setProjectId] = useState("");

  const fetchReports = () => {
    ReportService.getAllReports()
      .then((res) => setReports(res))
      .catch((err) => console.error("Error fetching reports:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleGenerate = () => {
    if (!projectId) {
      alert("⚠️ Please enter a project ID first");
      return;
    }
    ReportService.generateReport(projectId)
      .then(() => {
        alert("✅ Report generated successfully!");
        fetchReports();
      })
      .catch(() => alert("❌ Failed to generate report"));
  };

  const handleDelete = (reportId) => {
    if (window.confirm("🗑️ Are you sure you want to delete this report?")) {
      ReportService.deleteReport(reportId)
        .then(() => {
          alert("✅ Report deleted successfully!");
          fetchReports();
        })
        .catch(() => alert("❌ Failed to delete report"));
    }
  };

  return (
    <div className="reports-list">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>📋 Reports</h4>
        <div>
          <input
            type="number"
            placeholder="Project ID"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="form-control d-inline-block me-2"
            style={{ width: "150px" }}
          />
          <button className="btn btn-success" onClick={handleGenerate}>
            ➕ Generate Report
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading reports...</p>
      ) : reports.length === 0 ? (
        <p>No reports available</p>
      ) : (
        <table className="table table-striped shadow-sm">
          <thead>
            <tr>
              <th>Project</th>
              <th>Total</th>
              <th>Completed</th>
              <th>Pending</th>
              <th>Progress %</th>
              <th>Generated At</th>
              <th>Actions</th> {/* ✅ new column */}
            </tr>
          </thead>
          <tbody>
            {reports.map((r, idx) => (
              <tr key={idx}>
                <td>{r.projectName}</td>
                <td>{r.totalTasks}</td>
                <td>{r.completedTasks}</td>
                <td>{r.pendingTasks}</td>
                <td>{r.progressPercentage}%</td>
                <td>{r.generatedAt}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(r.id)} // ✅ use report ID
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportsList;
