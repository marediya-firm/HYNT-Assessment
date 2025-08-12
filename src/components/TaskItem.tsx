import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TaskItemFC } from "../models/Task";

const TaskItem: React.FC<TaskItemFC> = ({ task, onPress, onDelete }) => {
  const truncatedDescription = task.description
    ? task.description.length > 30
      ? `${task.description.substring(0, 30)}...`
      : task.description
    : "No description";

  return (
    <TouchableOpacity onPress={() => onPress(task)}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.description}>{truncatedDescription}</Text>
        </View>

        {task.media && (
          <View style={styles.mediaContainer}>
            {task.media.type.startsWith("image") ? (
              <Image
                source={{ uri: task.media.uri }}
                style={styles.mediaThumbnail}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.mediaThumbnail, styles.videoThumbnail]}>
                <Icon name="play-circle-outline" size={24} color="#333" />
              </View>
            )}
          </View>
        )}

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(task.id)}
        >
          <Image
            source={require("./../assets/images/delete.png")}
            style={styles.img}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  img: { tintColor: "red", marginTop: 5 },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    color: "#666",
    fontSize: 14,
  },
  mediaContainer: {
    marginRight: 10,
  },
  mediaThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  videoThumbnail: {
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    padding: 5,
  },
});

export default TaskItem;
