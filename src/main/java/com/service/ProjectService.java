package com.service;

import com.dto.ProjectDTO;
import com.model.Project;
import java.util.List;

public interface ProjectService {
    Project createProject(ProjectDTO projectDTO);
    List<Project> getAllProjects();
    Project updateProject(Long id, ProjectDTO projectDTO);
    void deleteProject(Long id);
}
