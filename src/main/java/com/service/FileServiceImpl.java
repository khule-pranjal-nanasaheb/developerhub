package com.service;


import com.dto.FileDTO;
import com.model.FileAttachment;
import com.model.Project;
import com.model.Task;
import com.repository.FileRepository;
import com.repository.ProjectRepository;
import com.repository.TaskRepository;
import com.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

 private final FileRepository fileRepository;
 private final ProjectRepository projectRepository;
 private final TaskRepository taskRepository;

 @Override
 public FileDTO uploadFileToProject(Long projectId, MultipartFile file) {
     try {
         Project project = projectRepository.findById(projectId)
                 .orElseThrow(() -> new RuntimeException("Project not found"));

         FileAttachment attachment = FileAttachment.builder()
                 .fileName(file.getOriginalFilename())
                 .fileType(file.getContentType())
                 .data(file.getBytes())
                 .project(project)
                 .build();

         return mapToDTO(fileRepository.save(attachment));
     } catch (IOException e) {
         throw new RuntimeException("Failed to upload file", e);
     }
 }

 @Override
 public FileDTO uploadFileToTask(Long taskId, MultipartFile file) {
     try {
         Task task = taskRepository.findById(taskId)
                 .orElseThrow(() -> new RuntimeException("Task not found"));

         FileAttachment attachment = FileAttachment.builder()
                 .fileName(file.getOriginalFilename())
                 .fileType(file.getContentType())
                 .data(file.getBytes())
                 .task(task)
                 .build();

         return mapToDTO(fileRepository.save(attachment));
     } catch (IOException e) {
         throw new RuntimeException("Failed to upload file", e);
     }
 }

 @Override
 public List<FileDTO> getFilesForProject(Long projectId) {
     return fileRepository.findByProjectId(projectId).stream()
             .map(this::mapToDTO).collect(Collectors.toList());
 }

 @Override
 public List<FileDTO> getFilesForTask(Long taskId) {
     return fileRepository.findByTaskId(taskId).stream()
             .map(this::mapToDTO).collect(Collectors.toList());
 }
 @Override
 public FileAttachment getFile(Long id) {
     return fileRepository.findById(id)
             .orElseThrow(() -> new RuntimeException("File not found"));
 }

 @Override
 public void deleteFile(Long id) {
     fileRepository.deleteById(id);
 }


 private FileDTO mapToDTO(FileAttachment file) {
     FileDTO dto = new FileDTO();
     dto.setId(file.getId());
     dto.setFileName(file.getFileName());
     dto.setFileType(file.getFileType());
     return dto;
 }
}