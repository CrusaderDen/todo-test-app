import { getTasks_endpoint, getTodolists_endpoint } from '@/backend/endpoints';

export const api = {
  getAllTodolists: getTodolists_endpoint,
  getTasksForTodolist: getTasks_endpoint,
};
