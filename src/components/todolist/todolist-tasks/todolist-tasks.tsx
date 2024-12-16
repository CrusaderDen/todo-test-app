import s from './todolist-tasks.module.scss';
import { Task } from '@/components/todolist/task/task';
import { TaskType } from '@/backend/db.types';

type Tasks = {
  tasks: TaskType[];
  todolistId: number;
};

export const TodolistTasks = ({ tasks, todolistId }: Tasks) => {
  return (
    <div className={s.tasksContainer}>
      {tasks.map(task => (
        <Task key={task.id} task={task} todolistId={todolistId} />
      ))}
    </div>
  );
};
