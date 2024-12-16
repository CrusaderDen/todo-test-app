import s from './todolist-title.module.scss';

import { todolistStatsType } from '@/components/todolist/todolist';
import { TodolistType } from '@/backend/db.types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setActiveTodolistId } from '@/store/todolists-slice';

type TodolistTitleProps = {
  todolist: TodolistType;
  stats: todolistStatsType;
  className: string;
};

export const TodolistTitle = ({ todolist, stats, className }: TodolistTitleProps) => {
  const dispatch = useAppDispatch();
  const activeTodolistId = useAppSelector(state => state.todolists.activeTodolistId);

  const onClickHandler = () => {
    if (activeTodolistId === todolist.id) {
      dispatch(setActiveTodolistId(null));
      return;
    }
    dispatch(setActiveTodolistId(todolist.id));
  };

  return (
    <div>
      <button className={className} onClick={onClickHandler}>
        <div className={s.titleHeader}>
          <p>{todolist.title}</p>
        </div>
        <div className={s.stats}>
          <span> Всего: {stats.totalCount}</span>
          <span className={s.green}>
            Готово: {stats.isDoneCount} ({stats.percentsOfComplete}%)
          </span>
          <span className={s.red}> Не готово: {stats.inProgressCount}</span>
        </div>
      </button>
    </div>
  );
};
