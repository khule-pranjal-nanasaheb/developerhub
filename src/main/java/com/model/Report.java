package com.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String projectName;
    private int totalTasks;
    private int completedTasks;
    private int pendingTasks;
    private double progressPercentage;
    private LocalDate generatedAt;
}
