// src/pages/ReportsPage.jsx
import React from "react";
import ReportsList from "../components/ReportsList";     // ✅ file name is ReportList.jsx
import TimelineReport from "../components/TimelineReport";

const ReportsPage = () => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">📑 Reports Dashboard</h2>

      {/* Project Reports List */}
      <div className="mb-5">
        <ReportsList />
      </div>


      {/* Timeline Report */}
      <div className="mb-5">
        <TimelineReport />
      </div>
    </div>
  );
};

export default ReportsPage;
