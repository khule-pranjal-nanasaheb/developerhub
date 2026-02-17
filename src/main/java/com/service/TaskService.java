package com.service;

import com.dto.TaskDTO;
import com.model.Task;

import java.util.List;

public interface TaskService {
    Task createTask(TaskDTO taskDTO);
    List<Task> getAllTasks();
    List<Task> getTasksByUser(String username);
    Task updateTask(Long id, TaskDTO taskDTO);
    void deleteTask(Long id);
}
