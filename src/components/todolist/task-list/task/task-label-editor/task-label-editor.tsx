import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { ChangeEvent, useEffect, useRef } from 'react';
import s from './task-label-editor.module.scss';
import { updateTaskForTodolistThunk } from '@/store/thunks';
import { TaskType } from '@/backend/db.types';
import { setTaskEditError } from '@/store/app-slice';
import { TaskValidation } from '@/components/todolist/task-validation/task-validation';

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
  const errorTipMessage = useAppSelector(state => state.app.taskEdit_ValidationError.errorMessage);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputText(newValue);
  };

  const resetInput = () => {
    setInputText(label);
    setEditMode(false);
  };

  const updateTask = () => {
    if (!errorTipMessage && inputText.trim() !== '') {
      dispatch(updateTaskForTodolistThunk({ todolistId, updatedTask: { ...task, label: inputText } }));
      setEditMode(false);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      updateTask();
    } else if (e.key === 'Escape') {
      resetInput();
    }
  };

  const handleOnBlur = () => {
    if (errorTipMessage) {
      inputRef.current?.focus();
    }
    updateTask();
  };

  useEffect(() => {
    return () => {
      dispatch(setTaskEditError({ taskId: null, errorMessage: null }));
    };
  }, [dispatch]);

  return (
    <div className={s.container}>
      <input
        ref={inputRef}
        className={s.editField}
        type="text"
        value={inputText}
        autoFocus
        spellCheck={false}
        onBlur={() => handleOnBlur()}
        onChange={e => handleChange(e)}
        onKeyDown={e => handleKeyDown(e)}
      />
      <TaskValidation type={'editTaskValidation'} textForValidation={inputText} taskId={task.id} />
    </div>
  );
};
