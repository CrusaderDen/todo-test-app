import { useAppDispatch } from '@/store/hooks';
import React, { ChangeEvent } from 'react';
import s from './task-label-editor.module.scss';
import { updateTaskForTodolistThunk } from '@/store/thunks';

type TaskLabelEditorProps = {
  setEditMode: (newEditMode: boolean) => void;
  setInputText: (newText: string) => void;
  todolistId: number;
  taskId: number;
  inputText: string;
};
export const TaskLabelEditor = ({ setEditMode, setInputText, todolistId, taskId, inputText }: TaskLabelEditorProps) => {
  const dispatch = useAppDispatch();

  const onBlurInputHandler = () => {
    dispatch(updateTaskForTodolistThunk({ todolistId, taskId, text: inputText }));
    setEditMode(false);
  };
  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  const onKeyDownInputHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      dispatch(updateTaskForTodolistThunk({ todolistId, taskId, text: inputText }));
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
