package com.dto;

import lombok.Data;

@Data
public class ProjectDTO {
    private String name;
    private String description;
    private String deadline;
    private String status;  // add this
}

