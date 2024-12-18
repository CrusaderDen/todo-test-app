import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  reducers: {
    changeTaskStatus: (state, action: PayloadAction<{ todolistId: number; taskId: number }>) => {
      const todolistId = action.payload.todolistId;
      const taskId = action.payload.taskId;
      const task = state[todolistId].find(task => task.id === taskId);
      if (task) {
        task.isDone = !task.isDone;
      }
    },
  },
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
      const { todolistId, taskId } = action.meta.arg;
      const taskIndex = state[todolistId].findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        state[todolistId][taskIndex] = action.payload;
      }
    });
    builder.addCase(deleteTaskForTodolistThunk.fulfilled, (state, action: any) => {
      const { todolistId, taskId } = action.payload;
      state[todolistId] = state[todolistId].filter(task => task.id !== taskId);
    });
  },
});

export const { changeTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
