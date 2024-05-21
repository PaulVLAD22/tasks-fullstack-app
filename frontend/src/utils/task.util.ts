import apiClient from "../apiClient";
import { Task } from "../types/Task";

export const createTask = async (taskName:string, taskDuration: number, addTask:any, toast: any) => {
    try {
        const newTask = {
          name: taskName,
          description: 'This is a new task.',
          taskDurationInSeconds: taskDuration,
        };
        const response = await apiClient.post<Task>('/tasks', newTask);
        addTask(response.data);
        toast({
          title: 'Task created',
          description: 'A new task has been created.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } catch (error: any) {
        toast({
          title: 'Error creating task',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
}