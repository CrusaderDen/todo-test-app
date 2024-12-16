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

export const Todolist = ({ todolist }: TodolistProps) => {
  const tasks = useAppSelector(state => state.tasks[todolist.id]);
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getTasksForTodolistThunk(todolist.id));
  }, [dispatch, todolist.id]);

  return (
    <article className={s.todolist}>
      <TodolistTitle title={todolist.title} isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && <TodolistTasks tasks={tasks} todolistId={todolist.id} />}
    </article>
  );
};
