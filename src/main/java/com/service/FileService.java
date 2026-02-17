package com.service;


import com.dto.FileDTO;
import com.model.FileAttachment;

import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface FileService {
 FileDTO uploadFileToProject(Long projectId, MultipartFile file);
 FileDTO uploadFileToTask(Long taskId, MultipartFile file);
 List<FileDTO> getFilesForProject(Long projectId);
 List<FileDTO> getFilesForTask(Long taskId);
void deleteFile(Long id);
FileAttachment getFile(Long id);
}
