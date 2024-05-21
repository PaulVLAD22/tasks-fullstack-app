package com.example.taskservice.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskStatus status;

    @Column(nullable = false)
    private LocalDateTime createdDate;

    @Column(nullable = false)
    private int taskDurationInSeconds;

    // Default constructor
    public Task() {
    }

    // Constructor with parameters
    public Task(String name, String description, TaskStatus status, LocalDateTime createdDate, int taskDurationInSeconds) {
        this.name = name;
        this.description = description;
        this.status = status;
        this.createdDate = createdDate;
        this.taskDurationInSeconds = taskDurationInSeconds;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public int getTaskDurationInSeconds() {
        return taskDurationInSeconds;
    }

    public void setTaskDurationInSeconds(int taskDurationInSeconds) {
        this.taskDurationInSeconds = taskDurationInSeconds;
    }
}
