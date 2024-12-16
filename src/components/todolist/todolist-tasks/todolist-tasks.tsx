import s from './todolist-tasks.module.scss';
import { Task } from '@/components/todolist/task/task';
import { TaskType } from '@/store/tasks-slice';

type Tasks = {
  tasks: TaskType[];
};

export const TodolistTasks = ({ tasks }: Tasks) => {
  return <div className={s.tasksContainer}>{tasks?.map(task => <Task key={task.id} label={task.label} />)}</div>;
};
