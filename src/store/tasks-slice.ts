import { createSlice } from '@reduxjs/toolkit';
import {
  createTaskForTodolistThunk,
  deleteTaskForTodolistThunk,
  getTasksForTodolistThunk,
  updateTaskForTodolistThunk,
} from '@/store/thunks';
import { Tasks, TaskType } from '@/backend/db.types';

const initialState: Tasks = {};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getTasksForTodolistThunk.fulfilled, (state, action: any) => {
      const todolistId = action.meta.arg;
      state[todolistId] = action.payload as TaskType[];
    });
    builder.addCase(createTaskForTodolistThunk.fulfilled, (state, action: any) => {
      const { todolistId } = action.meta.arg;
      state[todolistId].unshift(action.payload);
    });
    builder.addCase(updateTaskForTodolistThunk.fulfilled, (state, action: any) => {
      const { todolistId } = action.meta.arg;
      const taskIndex = state[todolistId].findIndex(task => task.id === action.payload.id);
      if (taskIndex !== -1) {
        state[todolistId][taskIndex] = { ...action.payload };
      }
    });
    builder.addCase(deleteTaskForTodolistThunk.fulfilled, (state, action: any) => {
      const { todolistId, taskId } = action.payload;
      state[todolistId] = state[todolistId].filter(task => task.id !== taskId);
    });
  },
});

export default tasksSlice.reducer;
