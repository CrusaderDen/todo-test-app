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

export const getTasks_endpoint = (todolistId: number): Promise<{ status: number; tasksForTodolist: TaskType[] }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const tasksForTodolist = tasks[todolistId];
      if (tasksForTodolist) {
        resolve({ status: 204, tasksForTodolist });
      } else {
        reject({ status: 404, message: `Failed to retrieve task for todolist with ID: ${todolistId}` });
      }
    }, getRandomDelay(300));
  });
};

export const createTask_endpoint = ({ todolistId, text }: CreateTaskEndpointsArgs): Promise<{ status: number; newTask?: TaskType }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const taskId = Date.now();
      const dataReceived = !!todolistId && !!text;
      const newTaskModel = { id: taskId, label: text, isDone: false };
      if (dataReceived) {
        resolve({ status: 204, newTask: newTaskModel });
      } else {
        reject({ status: 404, message: 'Failed to create task. Please, try again later.' });
      }
    }, getRandomDelay(100));
  });
};

export const updateTask_endpoint = ({
  todolistId,
  updatedTask,
}: UpdateTaskEndpointsArgs): Promise<{ status: number; updatedTask: TaskType }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const taskFound = !!todolistId && !!updatedTask;
      if (taskFound) {
        resolve({ status: 204, updatedTask });
      } else {
        reject({ status: 404, message: 'Task not found.' });
      }
    }, getRandomDelay(100));
  });
};

export const deleteTask_endpoint = ({ todolistId, taskId }: DeleteTaskEndpointsArgs): Promise<{ status: number }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const taskFound = !!todolistId && !!taskId;
      if (taskFound) {
        resolve({ status: 204 });
      } else {
        reject({ status: 404, message: 'Task not found.' });
      }
    }, getRandomDelay(100));
  });
};
