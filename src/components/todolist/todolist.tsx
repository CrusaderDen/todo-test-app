import s from './todolist.module.scss';
import { TodolistTasks } from '@/components/todolist/todolist-tasks/todolist-tasks';
import { TodolistTitle } from '@/components/todolist/todolist-title/todolist-title';
import { useState } from 'react';
import { TodolistType } from '@/store/todolists-slice';

type TodolistProps = {
  todolist: TodolistType;
};

export const Todolist = ({ todolist }: TodolistProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <article className={s.todolist}>
      <TodolistTitle title={todolist.title} isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && <TodolistTasks tasksId={todolist.id} />}
    </article>
  );
};
