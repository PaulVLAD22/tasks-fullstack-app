package com.example.taskservice.service;

import com.example.taskservice.model.Task;
import com.example.taskservice.model.TaskStatus;
import com.example.taskservice.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class TaskExecutionService {
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    public NotificationService notificationService;
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(4);

    @Async
    public void scheduleStatusChange(Task task) {
        scheduler.schedule(() -> {
            updateTaskStatus(task, TaskStatus.COMPLETED);
            notificationService.sendNotification(task);
        }, task.getTaskDurationInSeconds(), TimeUnit.SECONDS);
    }

    private void updateTaskStatus(Task task, TaskStatus status) {
        task.setStatus(status);
        taskRepository.save(task);
    }

    public void createTaskNotification(Task task) {
        notificationService.sendNotification(task);
    }


}
