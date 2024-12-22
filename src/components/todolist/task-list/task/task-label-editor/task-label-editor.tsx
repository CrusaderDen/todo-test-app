import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { ChangeEvent, useEffect, useRef } from 'react';
import s from './task-label-editor.module.scss';
import { updateTaskForTodolistThunk } from '@/store/thunks';
import { TaskType } from '@/backend/db.types';
import { setTaskEditError } from '@/store/app-slice';

type TaskLabelEditorProps = {
  setEditMode: (newEditMode: boolean) => void;
  setInputText: (newText: string) => void;
  todolistId: number;
  task: TaskType;
  inputText: string;
  label: string;
};
export const TaskLabelEditor = ({ setEditMode, setInputText, todolistId, task, inputText, label }: TaskLabelEditorProps) => {
  const dispatch = useAppDispatch();
  const errorTip = useAppSelector(state => state.app.taskEditError);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTask = () => {
    if (errorTip) return;
    dispatch(updateTaskForTodolistThunk({ todolistId, updatedTask: { ...task, label: inputText } }));
    setEditMode(false);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      updateTask();
    } else if (e.key === 'Escape') {
      setInputText(label);
      setEditMode(false);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    if (e.target.value.length > 20) {
      dispatch(setTaskEditError('Превышен максимальный размер (допускается не более 100 символов)'));
    } else {
      dispatch(setTaskEditError(null));
    }
  };

  const handleOnBlur = () => {
    if (errorTip && inputRef.current) {
      inputRef.current.focus();
    }
    updateTask();
  };

  useEffect(() => {
    return () => {
      dispatch(setTaskEditError(null));
    };
  }, [dispatch]);

  return (
    <div className={s.container} style={{ paddingLeft: '20px' }}>
      <input
        ref={inputRef}
        className={s.editField}
        type="text"
        value={inputText}
        autoFocus
        onBlur={() => handleOnBlur()}
        onChange={e => handleChange(e)}
        onKeyDown={e => handleKeyDown(e)}
      />
      {errorTip && <div className={s.errorTip}>{errorTip}</div>}
    </div>
  );
};
