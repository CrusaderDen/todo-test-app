import s from './task-list.module.scss';
import { Task } from '@/components/todolist/task-list/task/task';
import { TaskType, TodolistType } from '@/backend/db.types';
import { TaskFilters } from '@/components/todolist/task-filters/task-filters';
import { taskFilter } from '@/utils/task-filter';
import { TaskCreator } from '@/components/todolist/task-creator/task-creator';

type Tasks = {
  tasks: TaskType[];
  todolist: TodolistType;
  className: string;
};

export const TaskList = ({ tasks, todolist, className }: Tasks) => {
  const filteredTasks = taskFilter(todolist.filterVariant, tasks);

  return (
    <div className={className}>
      <TaskFilters todolist={todolist} className={s.tasksFilter} />
      <TaskCreator todolistId={todolist.id} />
      <div className={s.tasks}>
        {filteredTasks.map(task => (
          <Task key={task.id} task={task} todolistId={todolist.id} />
        ))}
      </div>
    </div>
  );
};
