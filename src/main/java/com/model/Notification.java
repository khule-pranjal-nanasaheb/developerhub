package com.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 private String message;

 private String recipient; // username or userId

 @Column(name = "is_read")
 private boolean read = false;

 private LocalDateTime createdAt;

 @ManyToOne
 @JoinColumn(name = "task_id", nullable = true)
 private Task task;

 @ManyToOne
 @JoinColumn(name = "project_id", nullable = true)
 private Project project;
}
