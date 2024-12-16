import s from './tasks-filter.module.scss';
import { useAppDispatch } from '@/store/hooks';
import { setFilter } from '@/store/todolists-slice';
import { FilterVariantType, TodolistType } from '@/backend/db.types';
import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type TasksFilter = {
  todolist: TodolistType;
  className: string;
};

export const TasksFilter = ({ todolist, className }: TasksFilter) => {
  return (
    <div className={className}>
      <FilterButton filterVariant={'all'} todolist={todolist}>
        All
      </FilterButton>
      <FilterButton filterVariant={'active'} todolist={todolist}>
        Active
      </FilterButton>
      <FilterButton filterVariant={'completed'} todolist={todolist}>
        Completed
      </FilterButton>
    </div>
  );
};

type FilterButtonProps = {
  filterVariant: FilterVariantType;
  todolist: TodolistType;
} & PropsWithChildren;

const FilterButton = ({ filterVariant, todolist, children }: FilterButtonProps) => {
  const dispatch = useAppDispatch();
  const handler = () => dispatch(setFilter({ todolistId: todolist.id, filter: filterVariant }));
  const isActive = filterVariant === todolist.filterVariant;
  return (
    <button className={clsx(s.filterButton, isActive && s.activeButton)} onClick={handler}>
      {children}
    </button>
  );
};
