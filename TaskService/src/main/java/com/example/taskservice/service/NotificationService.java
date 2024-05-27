package com.example.taskservice.service;


import com.example.taskservice.model.Task;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.example.taskservice.util.AppConstants.TASK_EXCHANGE;
import static com.example.taskservice.util.AppConstants.TASK_ROUTING_KEY;

@Service
public class NotificationService {

    @Autowired
    private RabbitTemplate rabbitTemplate;
    public void sendNotification(Task task) {
        rabbitTemplate.convertAndSend(TASK_EXCHANGE, TASK_ROUTING_KEY, task);
    }
}
