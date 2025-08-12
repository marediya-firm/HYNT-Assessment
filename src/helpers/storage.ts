import { MMKV } from "react-native-mmkv";
import { Task } from "../models/Task";

const TASKS_KEY = "@HYNTask";

const AsyncStorage = new MMKV();

export const getTasks = () => {
  try {
    const tasks = AsyncStorage.getString(TASKS_KEY);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error("Error getting tasks:", error);
    return [];
  }
};

export const saveTask = async (task: Task) => {
  try {
    const tasks = (await getTasks()) as Task[];
    const existingIndex = tasks.findIndex((t) => t.id === task.id);

    if (existingIndex >= 0) {
      tasks[existingIndex] = task;
    } else {
      tasks.push(task);
    }

    console.log("AsyncStorage", AsyncStorage);

    AsyncStorage.set(TASKS_KEY, JSON.stringify(tasks));
    return task;
  } catch (error) {
    console.error("Error saving task:", error);
    throw error;
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const tasks = await getTasks();
    const updatedTasks = tasks.filter((task: Task) => task.id !== taskId);
    AsyncStorage.set(TASKS_KEY, JSON.stringify(updatedTasks));
    return true;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
