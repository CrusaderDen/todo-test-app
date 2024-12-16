import { createSlice } from '@reduxjs/toolkit';
import { getTasksForTodolistThunk } from '@/store/thunks';

export type TaskType = {
  id: number;
  label: string;
};

export type Tasks = Record<string, TaskType[]>;

const initialState: Tasks = {};

export const tasksSlice = createSlice({
  name: 'todolists',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getTasksForTodolistThunk.fulfilled, (state, action) => {
      const todolistId = action.meta.arg;
      state[todolistId] = action.payload;
    });
  },
});

export default tasksSlice.reducer;
