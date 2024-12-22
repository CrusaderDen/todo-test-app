import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import s from './task-creator.module.scss';
import plusIcon from '@/assets/plus-circle-svgrepo-com.svg';
import { createTaskForTodolistThunk } from '@/store/thunks';
import { TaskValidation } from '@/components/todolist/task-validation/task-validation';

export const TaskCreator = ({ todolistId }: { todolistId: number }) => {
  const [taskLabel, setTaskLabel] = useState('');
  const errorTipMessage = useAppSelector(state => state.app.taskCreate_validationError);
  const dispatch = useAppDispatch();
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskLabel(e.currentTarget.value);
  };

  const createTask = () => {
    if (taskLabel.trim() !== '') {
      dispatch(createTaskForTodolistThunk({ todolistId, text: taskLabel }));
      setTaskLabel('');
    }
  };

  const handleClick = () => {
    createTask();
  };

  const onKeyDownInputHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      createTask();
    } else if (e.key === 'Escape') {
      setTaskLabel('');
    }
  };

  return (
    <div className={s.container}>
      <input
        type="text"
        value={taskLabel}
        onChange={e => onChangeHandler(e)}
        onKeyDown={e => onKeyDownInputHandler(e)}
        className={s.addTaskInput}
        placeholder={'Create a new task'}
      />
      <button onClick={handleClick} className={s.addTaskButton} disabled={taskLabel.length === 0 || !!errorTipMessage}>
        <img src={plusIcon} alt="icon" />
      </button>
      <TaskValidation type={'createTaskValidation'} textForValidation={taskLabel} className={s.errorTip} />
    </div>
  );
};
