package com.example.notificationsservice.controller;

import com.example.notificationsservice.config.TaskListener;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@Slf4j
public class NotificationController {

    @Autowired
    private TaskListener taskListener;

    @GetMapping(path="/notifications", produces = "text/event-stream")
    public SseEmitter getNotifications() {
        log.info("New Emitter!");
        return taskListener.addEmitter();
    }
}
