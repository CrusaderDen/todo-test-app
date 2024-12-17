import s from './task.module.scss';
import * as Checkbox from '@radix-ui/react-checkbox';
import { ChangeEvent, useId, useState } from 'react';
import clsx from 'clsx';
import { useAppDispatch } from '@/store/hooks';
import { changeTaskStatus, editTask, removeTask } from '@/store/tasks-slice';
import { TaskType } from '@/backend/db.types';
import basketIcon from '@/assets/trash-svgrepo-com.svg';
import penIcon from '@/assets/pen-new-square-svgrepo-com.svg';

type TaskProps = {
  todolistId: number;
  task: TaskType;
};

export const Task = ({ todolistId, task }: TaskProps) => {
  const { id: taskId, label, isDone } = task;
  const id = useId();
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);
  const [inputText, setInputText] = useState(label);

  const taskStatusHandler = () => {
    dispatch(changeTaskStatus({ todolistId, taskId }));
  };

  const taskRemoveHandler = () => {
    dispatch(removeTask({ todolistId, taskId }));
  };

  const taskEditHandler = () => {
    setEditMode(!editMode);
  };

  const noEditMode = (
    <label className={clsx(s.taskLabel, isDone && s.taskIsDone)} htmlFor={id}>
      {label}
    </label>
  );

  const onBlurInputHandler = () => {
    dispatch(editTask({ todolistId, taskId: task.id, text: inputText }));
    setEditMode(false);
  };
  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  const onKeyDownInputHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      dispatch(editTask({ todolistId, taskId: task.id, text: inputText }));
      setEditMode(false);
    }
  };

  const isEditMode = (
    <input
      className={s.taskInput}
      type="text"
      value={inputText}
      autoFocus
      onBlur={() => onBlurInputHandler()}
      onChange={e => onChangeInputHandler(e)}
      onKeyDown={e => onKeyDownInputHandler(e)}
    />
  );

  return (
    <div className={clsx(s.container, editMode && s.editContainer)}>
      <div className={s.task}>
        <Checkbox.Root className={s.checkboxRoot} id={id} checked={isDone} onClick={taskStatusHandler}>
          <Checkbox.Indicator className={s.checkboxIndicator} />
        </Checkbox.Root>
        {!editMode ? noEditMode : isEditMode}
      </div>
      <div className={s.iconContainer}>
        <button onClick={taskRemoveHandler}>
          <img src={basketIcon} alt="basket" />
        </button>
        <button onClick={taskEditHandler} disabled={task.isDone}>
          <img src={penIcon} alt="pen" />
        </button>
      </div>
    </div>
  );
};
