import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Video from "react-native-video";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "./HomeScreen";

type TaskDetailScreenRouteProp = RouteProp<RootStackParamList, "TaskDetail">;

const TaskDetailScreen = () => {
  const route = useRoute() as TaskDetailScreenRouteProp;
  const { task, handleEditTask } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text onPress={() => handleEditTask(task)} style={styles.edit}>
          Edit
        </Text>
        <Text style={styles.title}>{task.title}</Text>

        {task.description && (
          <Text style={styles.description}>{task.description}</Text>
        )}

        {task.media && (
          <View style={styles.mediaContainer}>
            {task.media.type.startsWith("image") ? (
              <Image
                source={{ uri: task.media.uri }}
                style={styles.media}
                resizeMode="contain"
              />
            ) : (
              <Video
                source={{ uri: task.media.uri }}
                style={styles.media}
                controls={true}
                resizeMode="contain"
              />
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: "#333",
  },
  mediaContainer: {
    marginTop: 20,
  },
  media: {
    width: "100%",
    height: 300,
    borderRadius: 5,
  },
  mediaInfo: {
    marginTop: 5,
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  edit: {
    fontWeight: "bold",
    position: "absolute",
    right: 10,
    top: 20,
    textDecorationLine: "underline",
    fontSize: 15,
  },
});

export default TaskDetailScreen;
