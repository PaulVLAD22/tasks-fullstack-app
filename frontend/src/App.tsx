import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Heading, VStack, Button, Text, useToast } from '@chakra-ui/react';
import apiClient from './apiClient';
import { Task } from './types/Task';
import TaskForm from './component/TaskForm';
import NotificationsComponent from './component/NotificationComponent';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const toast = useToast();

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

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

  return (
    <ChakraProvider>
      <Box p={5}>
        <Heading mb={6}>Task Management</Heading>
        <TaskForm addTask={addTask} />
        <VStack spacing={4} align="stretch" mt={10}>
          <NotificationsComponent tasks={tasks} setTasks={setTasks}/>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default App;
