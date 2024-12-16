import s from './todolist-tasks.module.scss';
import { Task } from '@/components/todolist/task/task';
import { useAppSelector } from '@/store/hooks';

type TasksSection = {
  tasksId: number;
};

export const TodolistTasks = ({ tasksId }: TasksSection) => {
  const tasks = useAppSelector(state => state.tasks[tasksId]);
  return (
    <div className={s.tasksContainer}>
      {tasks.map(task => (
        <Task key={task.id} label={task.label} />
      ))}
    </div>
  );
};
