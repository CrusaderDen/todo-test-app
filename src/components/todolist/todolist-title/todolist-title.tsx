// import s from './todolist-title.module.scss';

import s from '@/components/todolist/todolist.module.scss';

type TodolistTitleProps = {
  title: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const TodolistTitle = ({ title, isOpen, setIsOpen }: TodolistTitleProps) => {
  return (
    <button className={s.title} onClick={() => setIsOpen(!isOpen)}>
      <div>🡇</div>
      <p>{title}</p>
    </button>
  );
};
