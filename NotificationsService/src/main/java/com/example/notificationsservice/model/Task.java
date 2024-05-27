package com.example.notificationsservice.model;

import lombok.Data;

@Data
public class Task {
    private Long id;
    private String name;
    private String status;
    private int taskDurationInSeconds;

    // Getters and setters
}

