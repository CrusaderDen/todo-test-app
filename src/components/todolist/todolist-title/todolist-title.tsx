// import s from './todolist-title.module.scss';

import s from '@/components/todolist/todolist.module.scss';
import { todolistStatsType } from '@/components/todolist/todolist';

type TodolistTitleProps = {
  title: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  todolistStats: todolistStatsType;
};

export const TodolistTitle = ({ title, isOpen, setIsOpen, todolistStats }: TodolistTitleProps) => {
  return (
    <button className={s.titleButton} onClick={() => setIsOpen(!isOpen)}>
      <div className={s.titleHeader}>
        <div>🡇</div>
        <p>{title}</p>
      </div>
      <div className={s.stats}>
        <span> Всего: {todolistStats.totalCount}</span>
        <span className={s.green}>
          {' '}
          Готово: {todolistStats.isDoneCount} ({todolistStats.percentsOfComplete}%)
        </span>
        <span className={s.red}> Не готово: {todolistStats.inProgressCount}</span>
      </div>
    </button>
  );
};
