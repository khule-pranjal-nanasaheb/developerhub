package com.repository;

import com.model.FileAttachment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FileRepository extends JpaRepository<FileAttachment, Long> {
 List<FileAttachment> findByProjectId(Long projectId);
 List<FileAttachment> findByTaskId(Long taskId);
}
