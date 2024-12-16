import s from './todolist.module.scss';
import { TodolistTasks } from '@/components/todolist/todolist-tasks/todolist-tasks';
import { TodolistTitle } from '@/components/todolist/todolist-title/todolist-title';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getTasksForTodolistThunk } from '@/store/thunks';
import { TodolistType } from '@/backend/db.types';

type TodolistProps = {
  todolist: TodolistType;
};

export type todolistStatsType = {
  totalCount: number;
  isDoneCount: number;
  inProgressCount: number;
  percentsOfComplete: number;
};

export const Todolist = ({ todolist }: TodolistProps) => {
  const tasks = useAppSelector(state => state.tasks[todolist.id]);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const isDoneCount = tasks?.filter(task => task.isDone).length;
  const todolistStats = {
    totalCount: tasks?.length,
    isDoneCount: isDoneCount,
    inProgressCount: tasks?.length - isDoneCount,
    percentsOfComplete: Math.floor((isDoneCount / tasks?.length) * 100),
  };

  useEffect(() => {
    dispatch(getTasksForTodolistThunk(todolist.id));
  }, [dispatch, todolist.id]);

  return (
    <article className={s.todolist}>
      <TodolistTitle title={todolist.title} isOpen={isOpen} setIsOpen={setIsOpen} todolistStats={todolistStats} />
      {isOpen && <TodolistTasks tasks={tasks} todolistId={todolist.id} />}
    </article>
  );
};
