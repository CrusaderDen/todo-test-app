import { createSlice } from '@reduxjs/toolkit';

type AppState = {
  loading: boolean;
  error: string | null;
  taskEditError: {
    taskId: number | null;
    errorMessage: string | null;
  };
};

const initialState: AppState = {
  loading: false,
  error: null,
  taskEditError: {
    taskId: null,
    errorMessage: null,
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAppError: (state, action) => {
      state.error = action.payload;
    },
    setTaskEditError: (state, action) => {
      state.taskEditError = action.payload;
    },
  },
});

export const { setAppLoading, setAppError, setTaskEditError } = appSlice.actions;
export default appSlice.reducer;
