import { FilterVariantType, TaskType } from '@/backend/db.types';

export const taskFilter = (filterVariant: FilterVariantType, tasks: TaskType[]) => {
  let filteredTasks = tasks;
  if (filterVariant === 'active') {
    filteredTasks = tasks.filter(task => !task.isDone);
  } else if (filterVariant === 'completed') {
    filteredTasks = tasks.filter(task => task.isDone);
  }
  return filteredTasks;
};
