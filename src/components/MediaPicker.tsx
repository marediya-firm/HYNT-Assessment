import React, { useState } from "react";
import { View, TouchableOpacity, Alert, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { captureMedia, pickMediaFromLibrary } from "../helpers/mediaUtils";
import { MediaAttachment } from "../models/Task";

interface MediaPickerProps {
  onMediaSelected: (media: MediaAttachment) => void;
}

const MediaPicker: React.FC<MediaPickerProps> = ({ onMediaSelected }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCapture = async (isVideo: boolean) => {
    try {
      setIsLoading(true);
      const media = await captureMedia(isVideo);
      onMediaSelected(media);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePickFromLibrary = async (isVideo: boolean) => {
    try {
      setIsLoading(true);
      const media = await pickMediaFromLibrary(isVideo);
      onMediaSelected(media);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleCapture(false)}
        disabled={isLoading}
      >
        <Icon name="photo-camera" size={24} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePickFromLibrary(false)}
        disabled={isLoading}
      >
        <Icon name="photo-library" size={24} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleCapture(true)}
        disabled={isLoading}
      >
        <Icon name="videocam" size={24} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePickFromLibrary(true)}
        disabled={isLoading}
      >
        <Icon name="video-library" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
});

export default MediaPicker;
