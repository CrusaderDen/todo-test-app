import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTasksForTodolistThunk } from '@/store/thunks';
import { Tasks, TaskType } from '@/backend/db.types';

const initialState: Tasks = {};

export const tasksSlice = createSlice({
  name: 'todolists',
  initialState,
  reducers: {
    changeTaskStatus: (state, action: PayloadAction<{ todolistId: number; taskId: number }>) => {
      const todolistId = action.payload.todolistId;
      const taskId = action.payload.taskId;
      const task = state[todolistId].find(task => task.id === taskId);
      if (task) {
        task.isDone = !task.isDone;
      }
    },
    removeTask: (state, action: PayloadAction<{ todolistId: number; taskId: number }>) => {
      const todolistId = action.payload.todolistId;
      const taskId = action.payload.taskId;
      state[todolistId] = state[todolistId].filter(task => task.id !== taskId);
    },
    editTask: (state, action: PayloadAction<{ todolistId: number; taskId: number; text: string }>) => {
      const todolistId = action.payload.todolistId;
      const taskId = action.payload.taskId;
      const task = state[todolistId].find(task => task.id === taskId);
      if (task) {
        task.label = action.payload.text;
      }
    },
    addTask: (state, action: PayloadAction<{ todolistId: number; text: string }>) => {
      const taskId = Date.now();
      const newTaskModel = { id: taskId, label: action.payload.text, isDone: false };
      state[action.payload.todolistId].unshift(newTaskModel);
    },
  },
  extraReducers: builder => {
    builder.addCase(getTasksForTodolistThunk.fulfilled, (state, action: any) => {
      const todolistId = action.meta.arg;
      state[todolistId] = action.payload as TaskType[];
    });
  },
});

export const { changeTaskStatus, removeTask, editTask, addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
