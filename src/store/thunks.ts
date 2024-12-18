import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/store/store';
import { api } from '@/api/api';
import { setAppError, setAppLoading } from '@/store/app-slice';
import { TaskType, TodolistType } from '@/backend/db.types';
import { CreateTaskEndpointsArgs, DeleteTaskEndpointsArgs, UpdateTaskEndpointsArgs } from '@/backend/endpoints.types';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
}>();

export const getTodolistsThunk = createAppAsyncThunk('todolists/getTodolistsThunk', async (_, { dispatch }) => {
  dispatch(setAppLoading(true));
  try {
    const response = await api.getAllTodolists();
    return response as TodolistType[];
  } catch (error) {
    const errorMessage = (error as Error).message || 'Failed to load todolists';
    dispatch(setAppError(errorMessage || 'Failed to load todolists'));
  } finally {
    dispatch(setAppLoading(false));
  }
});

export const getTasksForTodolistThunk = createAppAsyncThunk('tasks/getTasksForTodolistThunk', async (todolistId: number, { dispatch }) => {
  dispatch(setAppLoading(true));
  try {
    const response = await api.getTasksForTodolist(todolistId);
    return response as TaskType[];
  } catch (error) {
    const errorMessage = (error as Error).message || 'Failed to load tasks';
    dispatch(setAppError(errorMessage));
  } finally {
    dispatch(setAppLoading(false));
  }
});

export const createTaskForTodolistThunk = createAppAsyncThunk(
  'tasks/createTaskForTodolistThunk',
  async ({ todolistId, text }: CreateTaskEndpointsArgs, { dispatch }) => {
    dispatch(setAppLoading(true));
    try {
      const response = await api.createTaskForTodolist({ todolistId, text });
      if (response.status === 204) {
        return response.newTask as TaskType;
      } else if (response.status === 404) {
        throw new Error('Failed to create task. Please, try again later.');
      }
    } catch (error) {
      const errorMessage = (error as Error).message || 'Failed to create task';
      dispatch(setAppError(errorMessage));
    } finally {
      dispatch(setAppLoading(false));
    }
  },
);

export const updateTaskForTodolistThunk = createAppAsyncThunk(
  'tasks/updateTaskForTodolistThunk',
  async ({ todolistId, taskId, text }: UpdateTaskEndpointsArgs, { dispatch }) => {
    dispatch(setAppLoading(true));
    try {
      const response = await api.updateTaskForTodolist({ todolistId, taskId, text });
      if (response.status === 204) {
        return response.updatedTask as TaskType;
      } else if (response.status === 404) {
        throw new Error('Task not found');
      }
    } catch (error) {
      const errorMessage = (error as Error).message || 'Failed to update task';
      dispatch(setAppError(errorMessage));
    } finally {
      dispatch(setAppLoading(false));
    }
  },
);

export const deleteTaskForTodolistThunk = createAppAsyncThunk(
  'tasks/deleteTaskForTodolistThunk',
  async ({ todolistId, taskId }: DeleteTaskEndpointsArgs, { dispatch }) => {
    dispatch(setAppLoading(true));
    try {
      const response = await api.deleteTaskForTodolist({ todolistId, taskId });
      if (response.status === 204) {
        return { todolistId, taskId };
      } else if (response.status === 404) {
        throw new Error('Task not found');
      }
    } catch (error) {
      const errorMessage = (error as Error).message || 'Failed to delete task';
      dispatch(setAppError(errorMessage));
    } finally {
      dispatch(setAppLoading(false));
    }
  },
);
