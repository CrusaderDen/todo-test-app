export type FilterVariantType = 'all' | 'active' | 'completed';

export type TodolistType = {
  id: number;
  title: string;
  filterVariant: FilterVariantType;
};

export type TaskType = {
  id: number;
  label: string;
  isDone: boolean;
};

export type Tasks = Record<string, TaskType[]>;
