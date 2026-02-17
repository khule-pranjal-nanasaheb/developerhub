package com.service;


import com.dto.CommentDTO;
import java.util.List;

public interface CommentService {
 CommentDTO addCommentToProject(Long projectId, CommentDTO commentDTO);
 CommentDTO addCommentToTask(Long taskId, CommentDTO commentDTO);
 List<CommentDTO> getCommentsForProject(Long projectId);
 List<CommentDTO> getCommentsForTask(Long taskId);
 void deleteComment(Long id);

}
