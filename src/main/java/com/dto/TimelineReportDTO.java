package com.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TimelineReportDTO {
    private int totalTasks;
    private int onTimeTasks;
    private int delayedTasks;
    private double onTimePercentage;
}
