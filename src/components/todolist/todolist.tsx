import s from './todolist.module.scss';
import { TaskList } from '@/components/todolist/task-list/task-list';
import { TodolistGeneral } from '@/components/todolist/todolist-general/todolist-general';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getTasksForTodolistThunk } from '@/store/thunks';
import { TodolistType } from '@/backend/db.types';
import clsx from 'clsx';
import arrow from './../../assets/icons8-arrow-100.png';

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
  const activeTodolistId = useAppSelector(state => state.todolists.activeTodolistId);

  const dispatch = useAppDispatch();
  const isOpen = activeTodolistId === todolist.id;

  const isDoneCount = tasks?.filter(task => task.isDone).length;
  const todolistStats = {
    totalCount: tasks?.length || 0,
    isDoneCount: isDoneCount || 0,
    inProgressCount: tasks?.length - isDoneCount || 0,
    percentsOfComplete: Math.floor((isDoneCount / tasks?.length) * 100) || 0,
  };

  useEffect(() => {
    dispatch(getTasksForTodolistThunk(todolist.id));
  }, [dispatch, todolist.id]);

  return (
    <article className={s.todolist}>
      <TodolistGeneral todolist={todolist} stats={todolistStats} className={clsx(s.todolistTitle, isOpen && s.todolistActive)} />
      {isOpen && (
        <>
          <img src={arrow} alt="arrow" className={s.arrow} />
          <TaskList tasks={tasks} todolist={todolist} className={s.todolistTasks} />
        </>
      )}
    </article>
  );
};
