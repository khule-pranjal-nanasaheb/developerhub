package com.repository;


import com.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
 List<Comment> findByProjectId(Long projectId);
 List<Comment> findByTaskId(Long taskId);
}
