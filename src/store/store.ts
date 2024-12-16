import { configureStore } from '@reduxjs/toolkit';
import { todolistsSlice } from '@/store/todolists-slice';
import { tasksSlice } from '@/store/tasks-slice';

export const store = configureStore({
  reducer: {
    todolists: todolistsSlice.reducer,
    tasks: tasksSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
