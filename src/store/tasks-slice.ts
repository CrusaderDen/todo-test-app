import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTasksForTodolistThunk } from '@/store/thunks';
import { Tasks, TaskType } from '@/backend/db.types';

const initialState: Tasks = {};

export const tasksSlice = createSlice({
  name: 'todolists',
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
    builder.addCase(getTasksForTodolistThunk.fulfilled, (state, action) => {
      const todolistId = action.meta.arg;
      state[todolistId] = action.payload as TaskType[];
    });
  },
});

export const { changeTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
