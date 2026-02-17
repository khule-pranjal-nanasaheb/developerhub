package com.controller;



import com.dto.NotificationDTO;
import com.service.NotificationService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

 private final NotificationService notificationService;
 @PostMapping("/create")
 public ResponseEntity<NotificationDTO> createNotification(@RequestBody NotificationDTO notificationDTO) {
     NotificationDTO savedNotification = notificationService.createNotification(notificationDTO);
     return ResponseEntity.ok(savedNotification);
 }


 @GetMapping("/{username}")
 public List<NotificationDTO> getNotificationsForUser(@PathVariable String username) {
     return notificationService.getNotificationsForUser(username);
 }

 @PutMapping("/read/{id}")
 public NotificationDTO markAsRead(@PathVariable Long id) {
     return notificationService.markAsRead(id);
 }
}
