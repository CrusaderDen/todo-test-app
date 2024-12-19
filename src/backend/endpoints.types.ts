import { TaskType } from '@/backend/db.types';

export type CreateTaskEndpointsArgs = {
  todolistId: number;
  text: string;
};

export type UpdateTaskEndpointsArgs = {
  todolistId: number;
  updatedTask: TaskType;
};

export type DeleteTaskEndpointsArgs = {
  todolistId: number;
  taskId: number;
};
