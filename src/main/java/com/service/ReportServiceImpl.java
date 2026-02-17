package com.service;

import com.model.Project;
import com.repository.ProjectRepository;
import com.model.TaskStatus;
import com.dto.ReportDTO;
import com.dto.TimelineReportDTO;
import com.model.Report;
import com.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;
    private final ProjectRepository projectRepository;

    @Override
    public ReportDTO generateProjectReport(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        int totalTasks = project.getTasks().size();
        int completedTasks = (int) project.getTasks().stream()
                .filter(task -> task.getStatus() == TaskStatus.COMPLETED)
                .count();
        int pendingTasks = totalTasks - completedTasks;

        double progress = totalTasks > 0 ? (completedTasks * 100.0 / totalTasks) : 0;

        Report report = Report.builder()
                .projectName(project.getName())
                .totalTasks(totalTasks)
                .completedTasks(completedTasks)
                .pendingTasks(pendingTasks)
                .progressPercentage(progress)
                .generatedAt(LocalDate.now())
                .build();

        reportRepository.save(report);

        return mapToDTO(report);
    }

    @Override
    public List<ReportDTO> getAllReports() {
        return reportRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TimelineReportDTO getTimelineReport(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        int totalTasks = project.getTasks().size();
        int delayedTasks = (int) project.getTasks().stream()
                .filter(task -> task.getDueDate() != null
                        && task.getDueDate().isBefore(LocalDate.now())
                        && task.getStatus() != TaskStatus.COMPLETED)
                .count();

        int onTimeTasks = totalTasks - delayedTasks;
        double onTimePercentage = totalTasks > 0 ? (onTimeTasks * 100.0 / totalTasks) : 0;

        return TimelineReportDTO.builder()
                .totalTasks(totalTasks)
                .delayedTasks(delayedTasks)
                .onTimeTasks(onTimeTasks)
                .onTimePercentage(onTimePercentage)
                .build();
    }

    // ✅ NEW delete method
    @Override
    public void deleteReport(Long reportId) {
        if (!reportRepository.existsById(reportId)) {
            throw new RuntimeException("Report not found with ID: " + reportId);
        }
        reportRepository.deleteById(reportId);
    }

    private ReportDTO mapToDTO(Report report) {
        return ReportDTO.builder()
        		.id(report.getId())
                .projectName(report.getProjectName())
                .totalTasks(report.getTotalTasks())
                .completedTasks(report.getCompletedTasks())
                .pendingTasks(report.getPendingTasks())
                .progressPercentage(report.getProgressPercentage())
                .generatedAt(report.getGeneratedAt())
                .build();
    }
}
