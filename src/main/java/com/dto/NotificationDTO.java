package com.dto;



import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationDTO {
 private Long id;
 private String message;
 private String recipient;
 private boolean read;
 private LocalDateTime createdAt;
 private Long projectId;
 private Long taskId;
}

