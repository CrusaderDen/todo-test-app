import { Tasks } from '@/store/tasks-slice';
import { TodolistType } from '@/store/todolists-slice';

export const todolists: TodolistType[] = [
  { id: 1, title: 'Планы на новогодние' },
  { id: 2, title: 'Семейные дела' },
  { id: 3, title: 'Рабочие задачи' },
];

export const tasks: Tasks = {
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
