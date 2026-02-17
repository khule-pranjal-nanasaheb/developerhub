package com.controller;

import com.dto.CommentDTO;
import com.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class CommentController {

 private final CommentService commentService;

 @PostMapping("/project/{projectId}")
 public CommentDTO addCommentToProject(@PathVariable Long projectId, @RequestBody CommentDTO dto) {
     return commentService.addCommentToProject(projectId, dto);
 }

 @PostMapping("/task/{taskId}")
 public CommentDTO addCommentToTask(@PathVariable Long taskId, @RequestBody CommentDTO dto) {
     return commentService.addCommentToTask(taskId, dto);
 }

 @GetMapping("/project/{projectId}")
 public List<CommentDTO> getProjectComments(@PathVariable Long projectId) {
     return commentService.getCommentsForProject(projectId);
 }

 @GetMapping("/task/{taskId}")
 public List<CommentDTO> getTaskComments(@PathVariable Long taskId) {
     return commentService.getCommentsForTask(taskId);
 }
 @DeleteMapping("/{id}")
 public void deleteComment(@PathVariable Long id) {
     commentService.deleteComment(id);
 }

}
