import React, { useState, useEffect } from 'react';
import { 
  View, 
  TextInput, 
  Button, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MediaPicker from './MediaPicker';
import Video from 'react-native-video';
import { validateTask } from '../helpers/validators'
import { Task, MediaAttachment } from '../models/Task';

interface TaskFormProps {
  task?: Task;
  onSubmit: (task: Task) => void;
  onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task: initialTask, onSubmit, onCancel }) => {
  const [task, setTask] = useState<Task>(initialTask || {
    id: Date.now().toString(),
    title: '',
    description: '',
    media: null,
  });
  
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  useEffect(() => {
    if (initialTask) {
      setTask(initialTask);
    }
  }, [initialTask]);

  const handleChange = (field: keyof Task, value: string | MediaAttachment | null) => {
    setTask(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleMediaSelected = (media: MediaAttachment) => {
    handleChange('media', media);
  };

  const removeMedia = () => {
    handleChange('media', null);
  };

  const handleSubmit = () => {
    try {
      validateTask(task);
      onSubmit(task);
    } catch (error:any) {
      Alert.alert('Validation Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, errors.title && styles.errorInput]}
        placeholder="Title *"
        value={task.title}
        onChangeText={(text) => handleChange('title', text)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Description"
        multiline
        numberOfLines={3}
        value={task.description}
        onChangeText={(text) => handleChange('description', text)}
      />
      
      <Text style={styles.sectionTitle}>Media Attachment</Text>
      <MediaPicker onMediaSelected={handleMediaSelected} />
      
      {task.media && (
        <View style={styles.mediaPreviewContainer}>
          {task.media.type.startsWith('image') ? (
            <Image 
              source={{ uri: task.media.uri }} 
              style={styles.mediaPreview} 
              resizeMode="contain"
            />
          ) : (
            <Video
              source={{ uri: task.media.uri }}
              style={styles.mediaPreview}
              paused={true}
              resizeMode="contain"
            />
          )}
          <TouchableOpacity 
            style={styles.removeMediaButton} 
            onPress={removeMedia}
          >
            <Icon name="close" size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}
      
      <View style={styles.buttonContainer}>
        <Button 
          title={initialTask ? "Update Task" : "Add Task"} 
          onPress={handleSubmit} 
        />
        {onCancel && (
          <Button 
            title="Cancel" 
            color="#999" 
            onPress={onCancel} 
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  errorInput: {
    borderColor: 'red',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mediaPreviewContainer: {
    position: 'relative',
    marginVertical: 10,
  },
  mediaPreview: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  removeMediaButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default TaskForm;