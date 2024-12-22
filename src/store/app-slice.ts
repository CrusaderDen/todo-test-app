import { createSlice } from '@reduxjs/toolkit';

type AppState = {
  loading: boolean;
  commonError: string | null;
  taskCreate_validationError: string | null;
  taskEdit_ValidationError: {
    taskId: number | null;
    errorMessage: string | null;
  };
};

const initialState: AppState = {
  loading: false,
  commonError: null,
  taskCreate_validationError: null,
  taskEdit_ValidationError: {
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
      state.commonError = action.payload;
    },
    setTaskEditError: (state, action) => {
      state.taskEdit_ValidationError = action.payload;
    },
    setTaskCreateError: (state, action) => {
      state.taskCreate_validationError = action.payload;
    },
  },
});

export const { setAppLoading, setAppError, setTaskEditError, setTaskCreateError } = appSlice.actions;
export default appSlice.reducer;
