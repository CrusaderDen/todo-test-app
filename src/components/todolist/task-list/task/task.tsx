import s from './task.module.scss';
import * as Checkbox from '@radix-ui/react-checkbox';
import { useId, useState } from 'react';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { TaskType } from '@/backend/db.types';
import basketIcon from '@/assets/trash-svgrepo-com.svg';
import penIcon from '@/assets/pen-new-square-svgrepo-com.svg';
import { TaskActionButton } from '@/components/todolist/task-list/task/task-action-button/task-action-button';
import { TaskLabel } from '@/components/todolist/task-list/task/task-label/task-label';
import { TaskLabelEditor } from '@/components/todolist/task-list/task/task-label-editor/task-label-editor';
import { DialogModal } from '@/components/dialog-modal/dialog-modal';
import { deleteTaskForTodolistThunk, updateTaskForTodolistThunk } from '@/store/thunks';

type TaskProps = {
  todolistId: number;
  task: TaskType;
};

export const Task = ({ todolistId, task }: TaskProps) => {
  const { id: taskId, label, isDone } = task;
  const errorTaskId = useAppSelector(state => state.app.taskEditError.taskId);
  const checkboxId = useId();
  const dispatch = useAppDispatch();

  const [editMode, setEditMode] = useState(false);
  const [inputText, setInputText] = useState(label);
  const [showModal, setShowModal] = useState(false);

  const taskStatusHandler = () => {
    dispatch(updateTaskForTodolistThunk({ todolistId, updatedTask: { ...task, isDone: !task.isDone } }));
  };

  const taskRemoveHandler = () => {
    setShowModal(true);
  };

  const modalConfirmHandler = () => {
    dispatch(deleteTaskForTodolistThunk({ todolistId, taskId }));
  };

  const taskEditHandler = () => {
    setEditMode(!editMode);
  };

  const taskInputProps = {
    setEditMode,
    setInputText,
    todolistId,
    task,
    inputText,
    label,
  };

  const taskLabelProps = {
    checkboxId,
    label,
    isDone,
  };

  const disabledCondition = errorTaskId !== null && errorTaskId !== taskId;

  return (
    <div className={clsx(s.container, editMode && s.editContainer, disabledCondition && s.disabled)}>
      <div className={s.task}>
        <Checkbox.Root className={s.checkboxRoot} id={checkboxId} checked={isDone} onClick={taskStatusHandler}>
          <Checkbox.Indicator className={s.checkboxIndicator} />
        </Checkbox.Root>
        {editMode ? <TaskLabelEditor {...taskInputProps} /> : <TaskLabel {...taskLabelProps} />}
      </div>
      <div className={s.iconContainer}>
        {!editMode && <TaskActionButton onClick={taskRemoveHandler} icon={basketIcon} />}
        {!editMode && <TaskActionButton onClick={taskEditHandler} icon={penIcon} />}
      </div>
      <DialogModal
        showModal={showModal}
        setShowModal={setShowModal}
        description={'Удалить задачу?'}
        confirmButtonText={'Да'}
        rejectButtonText={'Нет'}
        onConfirm={modalConfirmHandler}
      />
    </div>
  );
};
