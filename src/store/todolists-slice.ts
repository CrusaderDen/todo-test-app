import { createSlice } from '@reduxjs/toolkit';
import { getTodolistsThunk } from '@/store/thunks';

export type TodolistType = {
  id: number;
  title: string;
};

const initialState: TodolistType[] = [];

export const todolistsSlice = createSlice({
  name: 'todolists',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getTodolistsThunk.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

export default todolistsSlice.reducer;
