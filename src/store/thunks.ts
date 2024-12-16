import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/store/store';
import { TodolistType } from '@/store/todolists-slice';
import { api } from '@/api/api';
import { Task } from '@/store/tasks-slice';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
}>();

export const getTodolistsThunk = createAppAsyncThunk('todolists/getTodolistsThunk', async () => {
  const response = await api.getAllTodolists();
  return response as TodolistType[];
});

export const getTasksForTodolistThunk = createAppAsyncThunk('tasks/getTasksForTodolistThunk', async (todolistId: number) => {
  const response = await api.getTasksForTodolist(todolistId);
  return response as Task[];
});
