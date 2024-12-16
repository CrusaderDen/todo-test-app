import s from './task.module.scss';
import * as Checkbox from '@radix-ui/react-checkbox';
import { useId } from 'react';
import clsx from 'clsx';
import { useAppDispatch } from '@/store/hooks';
import { changeTaskStatus } from '@/store/tasks-slice';
import { TaskType } from '@/backend/db.types';

type TaskProps = {
  todolistId: number;
  task: TaskType;
};

export const Task = ({ todolistId, task }: TaskProps) => {
  const { id: taskId, label, isDone } = task;
  const id = useId();
  const dispatch = useAppDispatch();
  const onclickHandler = () => {
    dispatch(changeTaskStatus({ todolistId, taskId }));
  };
  return (
    <div className={s.task}>
      <Checkbox.Root className={s.checkboxRoot} id={id} checked={isDone} onClick={onclickHandler}>
        <Checkbox.Indicator className={s.checkboxIndicator} />
      </Checkbox.Root>
      <label className={clsx(s.tasklabel, isDone && s.taskIsDone)} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
