import { ButtonHTMLAttributes } from 'react';

type TaskActionButtonProps = {
  onClick: () => void;
  icon: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;
export const TaskActionButton = ({ onClick, icon, disabled }: TaskActionButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      <img src={icon} alt="icon" />
    </button>
  );
};
