// service/NotificationService.java
package com.service;

import com.dto.NotificationDTO;
import java.util.List;
public interface NotificationService {
    NotificationDTO createNotification(NotificationDTO notificationDTO);
    List<NotificationDTO> getNotificationsForUser(String username);
    NotificationDTO markAsRead(Long notificationId);
}
