export enum TaskStatus {
  OPEN = "open",
  COMPLETED = "completed",
}

export interface TaskDto {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  userId: string;
}

export interface CreateTaskDto {
  title: string;
  description: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
}
