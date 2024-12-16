import { getRandomDelay } from '@/utils/get-random-delay';
import { tasks, todolists } from '@/backend/db';

export const getTodolists_endpoint = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(todolists);
    }, getRandomDelay(300));
  });
};

export const getTasks_endpoint = (todolistId: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const tasksForTodolist = tasks[todolistId];
      resolve(tasksForTodolist);
    }, getRandomDelay(300));
  });
};
