import { createSlice } from '@reduxjs/toolkit';

type AppState = {
  loading: boolean;
  error: string | null;
};

const initialState: AppState = {
  loading: false,
  error: null,
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
  },
});

export const { setAppLoading, setAppError } = appSlice.actions;
export default appSlice.reducer;
