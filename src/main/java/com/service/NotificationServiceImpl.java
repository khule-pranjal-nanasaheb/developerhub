// service/impl/NotificationServiceImpl.java
package com.service;

import com.dto.NotificationDTO;
import com.model.Notification;
import com.repository.NotificationRepository;
import com.service.NotificationService;
import com.model.Project;
import com.model.Task;
import com.repository.ProjectRepository;
import com.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;

    @Override
    public NotificationDTO createNotification(NotificationDTO notificationDTO) {
        Project project = null;
        if (notificationDTO.getProjectId() != null) {
            project = projectRepository.findById(notificationDTO.getProjectId())
                    .orElseThrow(() -> new RuntimeException("Project not found"));
        }

        Task task = null;
        if (notificationDTO.getTaskId() != null) {
            task = taskRepository.findById(notificationDTO.getTaskId())
                    .orElseThrow(() -> new RuntimeException("Task not found"));
        }

        Notification notification = Notification.builder()
                .recipient(notificationDTO.getRecipient())
                .message(notificationDTO.getMessage())
                .read(false)
                .createdAt(LocalDateTime.now())
                .project(project)
                .task(task)
                .build();

        Notification saved = notificationRepository.save(notification);
        return mapToDTO(saved);
    }

    @Override
    public List<NotificationDTO> getNotificationsForUser(String username) {
        return notificationRepository.findByRecipientOrderByCreatedAtDesc(username)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public NotificationDTO markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setRead(true);
        return mapToDTO(notificationRepository.save(notification));
    }

    private NotificationDTO mapToDTO(Notification notification) {
        return NotificationDTO.builder()
                .recipient(notification.getRecipient())
                .message(notification.getMessage())
                .projectId(notification.getProject() != null ? notification.getProject().getId() : null)
                .taskId(notification.getTask() != null ? notification.getTask().getId() : null)
                .build();
    }
}
