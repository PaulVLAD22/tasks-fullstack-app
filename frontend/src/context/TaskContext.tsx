import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task } from '../types/Task';
import apiClient from '../apiClient';
import { useToast } from '@chakra-ui/react';
import { configuration } from '../config';

interface TaskContextProps {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const toast = useToast();

  useEffect(() => {
    fetchTasks();
    const eventSource = new EventSource(`${configuration.gateway_url}/notifications`); // Adjust the URL if needed

    eventSource.onmessage = (event) => {
      const updatedTask: Task = JSON.parse(event.data);
      updateTask(updatedTask);
    };

    eventSource.onerror = (err) => {
      console.error('EventSource failed:', err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await apiClient.get<Task[]>('/tasks');
      setTasks(response.data);
    } catch (error: any) {
      toast({
        title: 'Error fetching tasks',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) => {
      const existingTaskIndex = prevTasks.findIndex(task => task.id === updatedTask.id);
      if (existingTaskIndex !== -1) {
        // Update the existing task
        const updatedTasks = [...prevTasks];
        updatedTasks[existingTaskIndex] = updatedTask;
        return updatedTasks;
      } else {
        // Add new task
        return [...prevTasks, updatedTask];
      }
    });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextProps => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
