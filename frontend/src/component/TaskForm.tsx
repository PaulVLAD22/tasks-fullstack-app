import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, useToast } from '@chakra-ui/react';
import apiClient from '../apiClient';
import { Task } from '../types/Task';
import { createTask } from '../utils/task.util';

interface TaskFormProps {
    addTask: (task: Task) => void;
  }

const TaskForm: React.FC<TaskFormProps> = ({addTask}) => {
  const [taskName, setTaskName] = useState('');
  const [taskDuration, setTaskDuration] = useState<number | ''>('');
  const toast = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (taskName && taskDuration) {
        createTask(taskName, taskDuration, addTask, toast);
        setTaskName('');
        setTaskDuration('');
    } else {
      toast({
        title: 'Invalid input',
        description: 'Please enter both a task name and a duration in seconds.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5} borderWidth={1} borderRadius="lg">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="task-name" isRequired>
            <FormLabel>Task Name</FormLabel>
            <Input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </FormControl>
          <FormControl id="task-duration" isRequired>
            <FormLabel>Task Duration (seconds)</FormLabel>
            <Input
              type="number"
              value={taskDuration}
              onChange={(e) => setTaskDuration(parseInt(e.target.value, 10) || '')}
            />
          </FormControl>
          <Button type="submit" colorScheme="teal">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default TaskForm;
