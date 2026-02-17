package com.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportDTO {
    private Long id;   // ✅ new field

    private String projectName;
    private int totalTasks;
    private int completedTasks;
    private int pendingTasks;
    private double progressPercentage;
    private LocalDate generatedAt;
}
