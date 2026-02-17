import React, { useEffect, useState, useCallback } from "react";
import * as ReportService from "../services/ReportService";

const TimelineReport = () => {
  const [timeline, setTimeline] = useState(null);
  const [projectId, setProjectId] = useState("");

  const fetchTimeline = useCallback(() => {
    if (!projectId) return;
    ReportService.getTimelineReport(projectId)
      .then((data) => setTimeline(data))
      .catch((err) => console.error("Error fetching timeline:", err));
  }, [projectId]);

  useEffect(() => {
    if (projectId) fetchTimeline();
  }, [projectId, fetchTimeline]);

  return (
    <div className="timeline-report">
      <h4>⏳ Timeline Report</h4>
      <div className="mb-3">
        <input
          type="number"
          placeholder="Project ID"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="form-control"
          style={{ width: "200px" }}
        />
        <button className="btn btn-primary mt-2" onClick={fetchTimeline}>
          Fetch Report
        </button>
      </div>

      {!timeline ? (
        <p>No data available</p>
      ) : (
        <div className="card p-3 shadow-sm">
          <p><strong>Total Tasks:</strong> {timeline.totalTasks}</p>
          <p><strong>On-time Tasks:</strong> {timeline.onTimeTasks}</p>
          <p><strong>Delayed Tasks:</strong> {timeline.delayedTasks}</p>
          <p><strong>On-time %:</strong> {timeline.onTimePercentage}%</p>
        </div>
      )}
    </div>
  );
};

export default TimelineReport;
