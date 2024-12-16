import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/store/store';
import { TodolistType } from '@/store/todolists-slice';
import { api } from '@/api/api';
import { TaskType } from '@/store/tasks-slice';
import { setAppError, setAppLoading } from '@/store/app-slice';

// export type GetTasksForTodolistResponse = {
//   tasks: TaskType[];
//   todolistId: number;
// };

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
    dispatch(setAppError(errorMessage || 'Failed to load tasks'));
  } finally {
    dispatch(setAppLoading(false));
  }
});
