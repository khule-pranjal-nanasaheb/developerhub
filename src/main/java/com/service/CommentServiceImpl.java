package com.service;


import com.dto.CommentDTO;
import com.model.Comment;
import com.model.Project;
import com.model.Task;
import com.repository.CommentRepository;
import com.repository.ProjectRepository;
import com.repository.TaskRepository;
import com.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

 private final CommentRepository commentRepository;
 private final ProjectRepository projectRepository;
 private final TaskRepository taskRepository;

 @Override
 public CommentDTO addCommentToProject(Long projectId, CommentDTO dto) {
     Project project = projectRepository.findById(projectId)
             .orElseThrow(() -> new RuntimeException("Project not found"));

     Comment comment = Comment.builder()
             .content(dto.getContent())
             .author(dto.getAuthor())
             .createdAt(LocalDateTime.now())
             .project(project)
             .build();

     return mapToDTO(commentRepository.save(comment));
 }

 @Override
 public CommentDTO addCommentToTask(Long taskId, CommentDTO dto) {
     Task task = taskRepository.findById(taskId)
             .orElseThrow(() -> new RuntimeException("Task not found"));

     Comment comment = Comment.builder()
             .content(dto.getContent())
             .author(dto.getAuthor())
             .createdAt(LocalDateTime.now())
             .task(task)
             .build();

     return mapToDTO(commentRepository.save(comment));
 }

 @Override
 public List<CommentDTO> getCommentsForProject(Long projectId) {
     return commentRepository.findByProjectId(projectId).stream()
             .map(this::mapToDTO).collect(Collectors.toList());
 }

 @Override
 public List<CommentDTO> getCommentsForTask(Long taskId) {
     return commentRepository.findByTaskId(taskId).stream()
             .map(this::mapToDTO).collect(Collectors.toList());
 }

 private CommentDTO mapToDTO(Comment comment) {
     CommentDTO dto = new CommentDTO();
     dto.setId(comment.getId());
     dto.setContent(comment.getContent());
     dto.setAuthor(comment.getAuthor());
     dto.setCreatedAt(comment.getCreatedAt().toString());
     return dto;
 }
 @Override
 public void deleteComment(Long id) {
     commentRepository.deleteById(id);
 }

}
