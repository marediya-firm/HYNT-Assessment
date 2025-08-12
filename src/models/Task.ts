export interface MediaAttachment {
  uri: string;
  type: string;
  fileName: string;
  fileSize: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  media: MediaAttachment | null;
  createdAt?: number;
  updatedAt?: number;
}

export interface TaskItemFC {
  task: Task;
  onPress: (task: Task) => void;
  onDelete: (id: string) => void;
}
