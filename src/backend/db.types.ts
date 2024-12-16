export type TodolistType = {
  id: number;
  title: string;
};

export type TaskType = {
  id: number;
  label: string;
  isDone: boolean;
};

export type Tasks = Record<string, TaskType[]>;
