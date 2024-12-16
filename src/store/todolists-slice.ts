import { createSlice } from '@reduxjs/toolkit';

export type TodolistType = {
  id: number;
  title: string;
};

const todolists: TodolistType[] = [
  { id: 1, title: 'Планы на новогодние' },
  { id: 2, title: 'Семейные дела' },
  { id: 3, title: 'Рабочие задачи' },
];

const initialState = todolists;

export const todolistsSlice = createSlice({
  name: 'todolists',
  initialState,
  reducers: {
    test: (state, action) => {
      return [...state, action.payload];
    },
  },
});

// export const selectTodolists = (state: RootState) => state.todolists;
export default todolistsSlice.reducer;
