import { Tasks, TodolistType } from '@/backend/db.types';

export const todolists: TodolistType[] = [
  { id: 1, title: 'Планы на новогодние', filterVariant: 'all' },
  { id: 2, title: 'Семейные дела', filterVariant: 'all' },
  { id: 3, title: 'Рабочие задачи', filterVariant: 'all' },
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
    { id: 4, label: 'Купить хлеб', isDone: false },
    { id: 5, label: 'Сделать стирку', isDone: true },
    { id: 6, label: 'Приготовить ужин', isDone: false },
    { id: 7, label: 'Проверить почту', isDone: true },
    { id: 8, label: 'Заплатить за коммунальные услуги', isDone: false },
    { id: 9, label: 'Сходить в аптеку', isDone: true },
    { id: 10, label: 'Убрать в комнате', isDone: false },
  ],
  3: [
    { id: 1, label: 'Закончить проект', isDone: false },
    { id: 2, label: 'Подготовить презентацию', isDone: false },
    { id: 3, label: 'Сходить на встречу с клиентом', isDone: true },
    { id: 4, label: 'Написать отчет', isDone: false },
    { id: 5, label: 'Провести анализ данных', isDone: true },
    { id: 6, label: 'Обсудить проект с командой', isDone: false },
    { id: 7, label: 'Подготовить документы', isDone: true },
    { id: 8, label: 'Проверить бюджет', isDone: false },
    { id: 9, label: 'Согласовать сроки', isDone: true },
    { id: 10, label: 'Провести встречу с руководством', isDone: false },
    { id: 11, label: 'Обновить сайт', isDone: true },
    { id: 12, label: 'Подготовить отчет о продажах', isDone: false },
  ],
};
