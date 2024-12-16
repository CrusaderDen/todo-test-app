import { configureStore } from '@reduxjs/toolkit';
import { todolistsSlice } from '@/store/todolists-slice';
import { tasksSlice } from '@/store/tasks-slice';
import { appSlice } from '@/store/app-slice';

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    todolists: todolistsSlice.reducer,
    tasks: tasksSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
