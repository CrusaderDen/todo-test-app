import s from './task.module.scss';
import * as Checkbox from '@radix-ui/react-checkbox';
import { useId, useState } from 'react';
import clsx from 'clsx';
import { useAppDispatch } from '@/store/hooks';
import { TaskType } from '@/backend/db.types';
import basketIcon from '@/assets/trash-svgrepo-com.svg';
import penIcon from '@/assets/pen-new-square-svgrepo-com.svg';
import { TaskActionButton } from '@/components/todolist/task-list/task/task-action-button/task-action-button';
import { TaskLabel } from '@/components/todolist/task-list/task/task-label/task-label';
import { TaskLabelEditor } from '@/components/todolist/task-list/task/task-label-editor/task-label-editor';
import { DialogModal } from '@/components/dialog-modal/dialog-modal';
import { deleteTaskForTodolistThunk } from '@/store/thunks';
import { changeTaskStatus } from '@/store/tasks-slice';

type TaskProps = {
  todolistId: number;
  task: TaskType;
};

export const Task = ({ todolistId, task }: TaskProps) => {
  const { id: taskId, label, isDone } = task;
  const checkboxId = useId();
  const dispatch = useAppDispatch();

  const [editMode, setEditMode] = useState(false);
  const [inputText, setInputText] = useState(label);
  const [showModal, setShowModal] = useState(false);

  const taskStatusHandler = () => {
    dispatch(changeTaskStatus({ todolistId, taskId }));
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
    taskId,
    inputText,
  };

  const taskLabelProps = {
    checkboxId,
    label,
    isDone,
  };

  return (
    <div className={clsx(s.container, editMode && s.editContainer)}>
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
