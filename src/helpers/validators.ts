import { Task } from '../models/Task';

export const validateTask = (task: Task): void => {
  if (!task.title || task.title.trim() === '') {
    throw new Error('Title is required');
  }

  if (task.media) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (task.media.fileSize > maxSize) {
      throw new Error('Media file size exceeds 10MB limit');
    }

    const validTypes = ['image/jpeg', 'image/png', 'video/mp4'];
    if (!validTypes.includes(task.media.type)) {
      throw new Error('Invalid media type. Only JPEG, PNG, and MP4 are supported');
    }
  }
};