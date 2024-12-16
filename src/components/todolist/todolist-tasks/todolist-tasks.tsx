import s from './todolist-tasks.module.scss';
import { Task } from '@/components/todolist/todolist-tasks/task/task';
import { TaskType, TodolistType } from '@/backend/db.types';
import { TasksFilter } from '@/components/todolist/tasks-filter/tasks-filter';

type Tasks = {
  tasks: TaskType[];
  todolist: TodolistType;
};

export const TodolistTasks = ({ tasks, todolist }: Tasks) => {
  const filter = todolist.filterVariant;
  let filteredTasks = tasks;
  if (filter === 'active') {
    filteredTasks = tasks.filter(task => !task.isDone);
  } else if (filter === 'completed') {
    filteredTasks = tasks.filter(task => task.isDone);
  }

  return (
    <div className={s.wrapper}>
      <TasksFilter todolist={todolist} className={s.tasksFilter} />
      <div className={s.tasks}>
        {filteredTasks.map(task => (
          <Task key={task.id} task={task} todolistId={todolist.id} />
        ))}
      </div>
    </div>
  );
};
