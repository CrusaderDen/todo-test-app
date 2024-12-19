import { useAppDispatch } from '@/store/hooks';
import React, { ChangeEvent } from 'react';
import s from './task-label-editor.module.scss';
import { updateTaskForTodolistThunk } from '@/store/thunks';
import { TaskType } from '@/backend/db.types';

type TaskLabelEditorProps = {
  setEditMode: (newEditMode: boolean) => void;
  setInputText: (newText: string) => void;
  todolistId: number;
  task: TaskType;
  inputText: string;
};
export const TaskLabelEditor = ({ setEditMode, setInputText, todolistId, task, inputText }: TaskLabelEditorProps) => {
  const dispatch = useAppDispatch();

  const onBlurInputHandler = () => {
    dispatch(updateTaskForTodolistThunk({ todolistId, updatedTask: { ...task, label: inputText } }));
    setEditMode(false);
  };
  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  const onKeyDownInputHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      dispatch(updateTaskForTodolistThunk({ todolistId, updatedTask: { ...task, label: inputText } }));
      setEditMode(false);
    }
  };

  return (
    <input
      className={s.editField}
      type="text"
      value={inputText}
      autoFocus
      onBlur={() => onBlurInputHandler()}
      onChange={e => onChangeInputHandler(e)}
      onKeyDown={e => onKeyDownInputHandler(e)}
    />
  );
};
