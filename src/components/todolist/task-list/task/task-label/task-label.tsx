import clsx from 'clsx';
import s from './task-label.module.scss';

type TaskLabelProps = {
  checkboxId: string;
  label: string;
  isDone: boolean;
};
export const TaskLabel = ({ checkboxId, label, isDone }: TaskLabelProps) => {
  return (
    <label className={clsx(s.taskLabel, isDone && s.taskIsDone)} htmlFor={checkboxId}>
      {label}
    </label>
  );
};
