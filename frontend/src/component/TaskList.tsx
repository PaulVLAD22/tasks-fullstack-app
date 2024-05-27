import { Box, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useTasks } from "../context/TaskContext";

const TaskList: React.FC = () => {
  const { tasks } = useTasks();

  return (
    <VStack spacing={4} align="stretch" mt={10}>
      {tasks.map((task) => (
        <Box key={task.id} p={4} borderWidth={1} borderRadius="lg">
          <Text fontSize="xl">{task.name}</Text>
          <Text>Status: {task.status}</Text>
          <Text>Duration: {task.taskDurationInSeconds} seconds</Text>
        </Box>
      ))}
    </VStack>
  );
};
