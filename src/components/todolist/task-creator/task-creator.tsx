import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import s from './task-creator.module.scss';
import plusIcon from '@/assets/plus-circle-svgrepo-com.svg';
import { createTaskForTodolistThunk } from '@/store/thunks';

export const TaskCreator = ({ todolistId }: { todolistId: number }) => {
  const [newTaskLabel, setNewTaskLabel] = useState('');
  const dispatch = useAppDispatch();
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskLabel(e.currentTarget.value);

  const onClickHandler = () => {
    if (newTaskLabel.trim() !== '') {
      dispatch(createTaskForTodolistThunk({ todolistId, text: newTaskLabel }));
      setNewTaskLabel('');
    }
  };

  const onKeyDownInputHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      dispatch(createTaskForTodolistThunk({ todolistId, text: newTaskLabel }));
      setNewTaskLabel('');
    }
  };

  return (
    <div className={s.container}>
      <input
        type="text"
        value={newTaskLabel}
        onChange={e => onChangeHandler(e)}
        onKeyDown={e => onKeyDownInputHandler(e)}
        className={s.addTaskInput}
        placeholder={'Create a new task'}
      />
      <button onClick={onClickHandler} className={s.addTaskButton}>
        <img src={plusIcon} alt="icon" />
      </button>
    </div>
  );
};
