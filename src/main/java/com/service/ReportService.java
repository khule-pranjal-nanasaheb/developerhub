package com.service;

import com.dto.ReportDTO;
import com.dto.TimelineReportDTO;

import java.util.List;

public interface ReportService {
    ReportDTO generateProjectReport(Long projectId);
    List<ReportDTO> getAllReports();



    // NEW method
    TimelineReportDTO getTimelineReport(Long projectId);
    void deleteReport(Long reportId);
}
