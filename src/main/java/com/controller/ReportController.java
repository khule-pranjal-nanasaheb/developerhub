package com.controller;

import com.dto.ReportDTO;
import com.dto.TimelineReportDTO;
import com.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @PostMapping("/generate/{projectId}")
    public ResponseEntity<ReportDTO> generateReport(@PathVariable Long projectId) {
        return ResponseEntity.ok(reportService.generateProjectReport(projectId));
    }

    @GetMapping
    public ResponseEntity<List<ReportDTO>> getAllReports() {
        return ResponseEntity.ok(reportService.getAllReports());
    }

    // NEW endpoint
    @GetMapping("/timeline/{projectId}")
    public ResponseEntity<TimelineReportDTO> getTimelineReport(@PathVariable Long projectId) {
        return ResponseEntity.ok(reportService.getTimelineReport(projectId));
    }
 // ReportController.java
    @DeleteMapping("/{id}")
    public void deleteReport(@PathVariable Long id) {
        reportService.deleteReport(id);
    }

}
