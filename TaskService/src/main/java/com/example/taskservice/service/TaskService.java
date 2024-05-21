package com.example.taskservice.service;

import com.example.taskservice.model.Task;
import com.example.taskservice.model.TaskStatus;
import com.example.taskservice.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@EnableAsync
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private TaskExecutionService taskExecutionService;

    public Task createTask(Task task) {
        task.setCreatedDate(LocalDateTime.now());
        task.setStatus(TaskStatus.IN_PROGRESS); // Set status to IN_PROGRESS initially
        Task savedTask = taskRepository.save(task);
        taskExecutionService.scheduleStatusChange(task);
        return savedTask;
    }


    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
}
