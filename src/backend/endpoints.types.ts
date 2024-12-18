export type CreateTaskEndpointsArgs = {
  todolistId: number;
  text: string;
};

export type UpdateTaskEndpointsArgs = {
  todolistId: number;
  taskId: number;
  text: string;
};

export type DeleteTaskEndpointsArgs = {
  todolistId: number;
  taskId: number;
};
