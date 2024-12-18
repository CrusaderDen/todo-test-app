import { getRandomDelay } from '@/utils/get-random-delay';
import { tasks, todolists } from '@/backend/db';
import { CreateTaskEndpointsArgs, DeleteTaskEndpointsArgs, UpdateTaskEndpointsArgs } from '@/backend/endpoints.types';
import { TaskType } from '@/backend/db.types';

//todolist endpoints
export const getTodolists_endpoint = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(todolists);
    }, getRandomDelay(300));
  });
};

//task endpoints

export const getTasks_endpoint = (todolistId: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const tasksForTodolist = tasks[todolistId];
      resolve(tasksForTodolist);
    }, getRandomDelay(300));
  });
};

export const createTask_endpoint = ({ todolistId, text }: CreateTaskEndpointsArgs): Promise<{ status: number; newTask?: TaskType }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const taskId = Date.now();
      const newTaskModel = { id: taskId, label: text, isDone: false };
      tasks[todolistId] = [newTaskModel, ...tasks[todolistId]];
      if (newTaskModel) {
        resolve({ status: 204, newTask: newTaskModel });
      } else {
        resolve({ status: 404 });
      }
    }, getRandomDelay(100));
  });
};

export const updateTask_endpoint = ({
  todolistId,
  taskId,
  text,
}: UpdateTaskEndpointsArgs): Promise<{ status: number; updatedTask?: TaskType }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const task = tasks[todolistId].find(task => task.id === taskId);
      if (task) {
        const updatedTask = { ...task, label: text };
        resolve({ status: 204, updatedTask });
      } else {
        resolve({ status: 404 });
      }
    }, getRandomDelay(100));
  });
};

export const deleteTask_endpoint = ({ todolistId, taskId }: DeleteTaskEndpointsArgs): Promise<{ status: number }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      tasks[todolistId] = tasks[todolistId].filter(task => task.id !== taskId);
      // resolve(tasks[todolistId]);
      resolve({ status: 204 });
    }, getRandomDelay(100));
  });
};
