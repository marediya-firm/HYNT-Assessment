import { Button, Modal, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { Task } from "../models/Task";
import TaskList from "../components/TaskList";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { deleteTask, getTasks, saveTask } from "../helpers/storage";
import TaskForm from "../components/TaskForm";

export type RootStackParamList = {
  Home: undefined;
  TaskDetail: { task: Task; handleEditTask: (task: Task) => void };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [tasks, setTasks] = useState<Task[]>(getTasks() ?? []);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useFocusEffect(() => {
    loadTasks();
  });
  const loadTasks = async () => {
    const loadedTasks = getTasks();
    setTasks(loadedTasks);
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsFormVisible(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormVisible(true);
  };

  const handleTaskPress = (task: Task) => {
    navigation.navigate("TaskDetail", { task, handleEditTask });
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
    loadTasks();
  };

  const handleSubmit = async (task: Task) => {
    setIsFormVisible(false);
    saveTask(task);
    loadTasks();
  };
  return (
    <View style={styles.container}>
      <TaskList
        tasks={tasks}
        onTaskPress={handleTaskPress}
        onTaskDelete={handleDeleteTask}
      />

      <View style={styles.addButtonContainer}>
        <Button title="Add Task" onPress={handleAddTask} />
      </View>

      <Modal visible={isFormVisible} animationType="slide">
        <TaskForm
          task={editingTask as Task}
          onSubmit={handleSubmit}
          onCancel={() => setIsFormVisible(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButtonContainer: {
    padding: 15,
  },
});
export default HomeScreen;
