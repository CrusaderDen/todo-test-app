import { Tasks, TodolistType } from '@/backend/db.types';

export const todolists: TodolistType[] = [
  { id: 1, title: 'Планы на новогодние' },
  { id: 2, title: 'Семейные дела' },
  { id: 3, title: 'Рабочие задачи' },
];

export const tasks: Tasks = {
  1: [
    { id: 1, label: 'Сходить в баню', isDone: true },
    { id: 2, label: 'Покататься на лыжах с горки', isDone: false },
    { id: 3, label: 'Вспомнить как скользить на коньках', isDone: false },
  ],
  2: [
    { id: 1, label: 'Сходить в магазин за продуктами', isDone: false },
    { id: 2, label: 'Помыть полы', isDone: false },
    { id: 3, label: 'Покормить котов', isDone: true },
  ],
  3: [
    { id: 1, label: 'Закончить проект', isDone: false },
    { id: 2, label: 'Подготовить презентацию', isDone: false },
    { id: 3, label: 'Сходить на встречу с клиентом', isDone: true },
  ],
};
