import React, { useEffect, useState } from 'react';
import { Task } from '../types/Task';
import { useToast } from '@chakra-ui/react';

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}
const NotificationsComponent: React.FC<Props> = ({tasks, setTasks}) => {
  const toast = useToast();

  useEffect(() => {

    // e ceva ce nu merge aici la logica
    const eventSource = new EventSource('http://localhost:8080/notifications'); // Adjust the URL if needed

    eventSource.onmessage = (event) => {
        console.log("DADA")
        toast({
            title: 'Notification Received',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
      const newTask: Task = JSON.parse(event.data);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    eventSource.onerror = (err) => {
      console.error('EventSource failed:', err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>Task Notifications</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name}: {task.status}<br></br>
            {task.taskDurationInSeconds} Seconds
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsComponent;
