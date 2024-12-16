import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTodolistsThunk } from '@/store/thunks';
import { FilterVariantType, TodolistType } from '@/backend/db.types';

type InitialState = {
  todolists: TodolistType[];
  activeTodolistId: number | null;
};

const initialState: InitialState = {
  todolists: [],
  activeTodolistId: null,
};

export const todolistsSlice = createSlice({
  name: 'todolists',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<{ todolistId: number; filter: FilterVariantType }>) => {
      const todolist = state.todolists.find(todolist => todolist.id === action.payload.todolistId);
      if (todolist) {
        todolist.filterVariant = action.payload.filter;
      }
    },
    setActiveTodolistId: (state, action) => {
      state.activeTodolistId = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getTodolistsThunk.fulfilled, (state, action: any) => {
      state.todolists = action.payload;
    });
  },
});

export const { setFilter, setActiveTodolistId } = todolistsSlice.actions;
export default todolistsSlice.reducer;
