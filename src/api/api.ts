import {
  createTask_endpoint,
  deleteTask_endpoint,
  getTasks_endpoint,
  getTodolists_endpoint,
  updateTask_endpoint,
} from '@/backend/endpoints';

export const api = {
  getAllTodolists: getTodolists_endpoint,
  getTasksForTodolist: getTasks_endpoint,
  createTaskForTodolist: createTask_endpoint,
  updateTaskForTodolist: updateTask_endpoint,
  deleteTaskForTodolist: deleteTask_endpoint,
};
