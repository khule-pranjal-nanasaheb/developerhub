package com.service;

import com.dto.ProjectDTO;
import com.model.Project;
import com.model.ProjectStatus;
import com.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    @Override
    public Project createProject(ProjectDTO projectDTO) {
        LocalDate deadline = parseDeadline(projectDTO.getDeadline());

        Project project = Project.builder()
                .name(projectDTO.getName())
                .description(projectDTO.getDescription())
                .deadline(deadline)
                .status(ProjectStatus.NEW)
                .build();

        return projectRepository.save(project);
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public Project updateProject(Long id, ProjectDTO projectDTO) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));

        LocalDate deadline = parseDeadline(projectDTO.getDeadline());

        project.setName(projectDTO.getName());
        project.setDescription(projectDTO.getDescription());
        project.setDeadline(deadline);

        // Update status conditionally if needed
        if (project.getStatus() == ProjectStatus.NEW) {
            project.setStatus(ProjectStatus.IN_PROGRESS);
        }

        return projectRepository.save(project);
    }

    @Override
    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new RuntimeException("Project not found with id: " + id);
        }
        projectRepository.deleteById(id);
    }

    // Utility method to safely parse LocalDate
    private LocalDate parseDeadline(String deadlineStr) {
        try {
            return LocalDate.parse(deadlineStr);
        } catch (DateTimeParseException e) {
            throw new RuntimeException("Invalid date format for deadline: " + deadlineStr);
        }
    }
}
