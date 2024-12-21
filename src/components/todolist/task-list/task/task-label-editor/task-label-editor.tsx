import { useAppDispatch } from '@/store/hooks';
import React, { ChangeEvent, useEffect, useState } from 'react';
import s from './task-label-editor.module.scss';
import { updateTaskForTodolistThunk } from '@/store/thunks';
import { TaskType } from '@/backend/db.types';
import * as Tooltip from '@radix-ui/react-tooltip';

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
  const [errorTip, setErrorTip] = useState('');
  const [open, setOpen] = useState(false);

  const updateTask = () => {
    if (inputText.length <= 100) {
      dispatch(updateTaskForTodolistThunk({ todolistId, updatedTask: { ...task, label: inputText } }));
      setEditMode(false);
    } else {
      setErrorTip('Превышен максимальный размер (допускается не более 100 символов)');
    }
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
  };

  useEffect(() => {
    if (errorTip) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [errorTip]);

  return (
    <>
      <Tooltip.Provider>
        <Tooltip.Root open={open} onOpenChange={setOpen}>
          <Tooltip.Trigger asChild>
            <input
              className={s.editField}
              type="text"
              value={inputText}
              autoFocus
              onBlur={() => updateTask()}
              onChange={e => handleChange(e)}
              onKeyDown={e => handleKeyDown(e)}
            />
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className={s.tipContent}>
              {errorTip}
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </>
  );
};
