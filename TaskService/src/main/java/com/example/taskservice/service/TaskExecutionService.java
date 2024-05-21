package com.example.taskservice.service;

import com.example.taskservice.model.Task;
import com.example.taskservice.model.TaskStatus;
import com.example.taskservice.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class TaskExecutionService {
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private RabbitTemplate rabbitTemplate;
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    @Async
    public void scheduleStatusChange(Task task) {
        scheduler.schedule(() -> {
            updateTaskStatus(task.getId(), TaskStatus.COMPLETED);
            sendNotification(task);
        }, task.getTaskDurationInSeconds(), TimeUnit.SECONDS);
    }

    private void updateTaskStatus(Long taskId, TaskStatus status) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setStatus(status);
            taskRepository.save(task);
        }
    }

    private void sendNotification(Task task) {
        rabbitTemplate.convertAndSend("task_exchange", "task_routing_key", task);
    }
}
