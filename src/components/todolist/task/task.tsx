import s from './task.module.scss';
import * as Checkbox from '@radix-ui/react-checkbox';
import { useId } from 'react';

export const Task = ({ label }: { label: string }) => {
  const id = useId();
  return (
    <div className={s.task}>
      <Checkbox.Root className={s.checkboxRoot} id={id}>
        <Checkbox.Indicator className={s.checkboxIndicator} />
      </Checkbox.Root>
      <label className={s.label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
