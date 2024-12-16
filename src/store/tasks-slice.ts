import { createSlice } from '@reduxjs/toolkit';

export type Task = {
  id: number;
  label: string;
};

export type Tasks = Record<string, Task[]>;

const tasks: Tasks = {
  1: [
    { id: 1, label: 'Сходить в баню' },
    { id: 2, label: 'Покататься на лыжах с горки' },
    { id: 3, label: 'Вспомнить как скользить на коньках' },
  ],
  2: [
    { id: 1, label: 'Сходить в магазин за продуктами' },
    { id: 2, label: 'Помыть полы' },
    { id: 3, label: 'Покормить котов' },
  ],
  3: [
    { id: 1, label: 'Закончить проект' },
    { id: 2, label: 'Подготовить презентацию' },
    { id: 3, label: 'Сходить на встречу с клиентом' },
  ],
};

const initialState = tasks;

export const tasksSlice = createSlice({
  name: 'todolists',
  initialState,
  reducers: {},
});

// export const selectTasks = (state: RootState) => state.tasks;
export default tasksSlice.reducer;
