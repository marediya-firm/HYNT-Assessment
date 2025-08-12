import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import TaskItem from "./TaskItem";
import { Task } from "../models/Task";
import { Text } from "react-native";

interface TaskListProps {
  tasks: Task[];
  onTaskPress: (task: Task) => void;
  onTaskDelete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTaskPress,
  onTaskDelete,
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem task={item} onPress={onTaskPress} onDelete={onTaskDelete} />
        )}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text>No Task Found</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: { flexGrow: 1 },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default TaskList;
