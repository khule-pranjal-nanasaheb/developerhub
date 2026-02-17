package com.controller;



import com.dto.FileDTO;
import com.model.FileAttachment;
import com.service.FileService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    @PostMapping("/project/{projectId}")
    public FileDTO uploadToProject(@PathVariable Long projectId, @RequestParam("file") MultipartFile file) {
        return fileService.uploadFileToProject(projectId, file);
    }

    @PostMapping("/task/{taskId}")
    public FileDTO uploadToTask(@PathVariable Long taskId, @RequestParam("file") MultipartFile file) {
        return fileService.uploadFileToTask(taskId, file);
    }

    @GetMapping("/project/{projectId}")
    public List<FileDTO> getProjectFiles(@PathVariable Long projectId) {
        return fileService.getFilesForProject(projectId);
    }

    @GetMapping("/task/{taskId}")
    public List<FileDTO> getTaskFiles(@PathVariable Long taskId) {
        return fileService.getFilesForTask(taskId);
    }
    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable Long id) {
        FileAttachment file = fileService.getFile(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFileName() + "\"")
                .contentType(MediaType.parseMediaType(file.getFileType()))
                .body(file.getData());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFile(@PathVariable Long id) {
        fileService.deleteFile(id);
        return ResponseEntity.noContent().build();
    }
}