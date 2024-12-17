import s from './task-list.module.scss';
import { Task } from '@/components/todolist/task-list/task/task';
import { TaskType, TodolistType } from '@/backend/db.types';
import { TaskFilters } from '@/components/todolist/task-filters/task-filters';

type Tasks = {
  tasks: TaskType[];
  todolist: TodolistType;
  className: string;
};

export const TaskList = ({ tasks, todolist, className }: Tasks) => {
  const filter = todolist.filterVariant;
  let filteredTasks = tasks;
  if (filter === 'active') {
    filteredTasks = tasks.filter(task => !task.isDone);
  } else if (filter === 'completed') {
    filteredTasks = tasks.filter(task => task.isDone);
  }

  return (
    <div className={className}>
      <TaskFilters todolist={todolist} className={s.tasksFilter} />
      <div className={s.tasks}>
        {filteredTasks.map(task => (
          <Task key={task.id} task={task} todolistId={todolist.id} />
        ))}
      </div>
    </div>
  );
};
