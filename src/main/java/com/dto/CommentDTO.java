package com.dto;
//dto/CommentDTO.java

import lombok.Data;

@Data
public class CommentDTO {
 private Long id;
 private String content;
 private String author;
 private String createdAt;
}
