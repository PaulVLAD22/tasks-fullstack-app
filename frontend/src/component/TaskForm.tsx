import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Task } from '../types/Task';
import apiClient from '../apiClient';

interface TaskFormProps {
  addTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newTask: Task = {
      name,
      taskDurationInSeconds: duration,
    }

    try {
      // Assuming you have an API endpoint to create a task
      const response = await apiClient.post<Task>('/tasks', newTask);
      addTask(response.data);
      setName('');
      setDuration(0);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <FormControl mb={4}>
        <FormLabel>Task Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} required />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Task Duration (seconds)</FormLabel>
        <Input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          required
        />
      </FormControl>
      <Button type="submit" colorScheme="blue">
        Add Task
      </Button>
    </Box>
  );
};

export default TaskForm;
