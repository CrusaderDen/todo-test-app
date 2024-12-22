import s from '@/components/todolist/task-validation/task-validation.module.scss';
import clsx from 'clsx';
import { setTaskCreateError, setTaskEditError } from '@/store/app-slice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';

type EditTaskValidationProps = {
  type: 'editTaskValidation';
  textForValidation: string;
  taskId: number;
  className?: string;
};

type CreateTaskValidationProps = {
  type: 'createTaskValidation';
  textForValidation: string;
  className?: string;
  taskId?: never;
};

type TaskValidationProps = EditTaskValidationProps | CreateTaskValidationProps;

export const TaskValidation = ({ type, textForValidation, taskId, className }: TaskValidationProps) => {
  const dispatch = useDispatch();
  let errorTipMessage;
  if (type === 'editTaskValidation') {
    errorTipMessage = useAppSelector(state => state.app.taskEdit_ValidationError.errorMessage);
  } else if (type === 'createTaskValidation') {
    errorTipMessage = useAppSelector(state => state.app.taskCreate_validationError);
  }

  const validavion = () => {
    let errorMessage = null;

    switch (type) {
      case 'editTaskValidation':
        if (textForValidation.length > 20) {
          errorMessage = 'Превышен максимальный размер (допускается не более 100 символов)';
        } else if (textForValidation.trim() === '') {
          errorMessage = 'Таска не должна быть пустой';
        }
        break;
      case 'createTaskValidation':
        if (textForValidation.length > 20) {
          errorMessage = 'Превышен максимальный размер (допускается не более 100 символов)';
        }
        break;
      default:
        errorMessage = null;
    }

    return errorMessage;
  };

  useEffect(() => {
    const errorMessage = validavion();
    if (type === 'editTaskValidation') {
      dispatch(setTaskEditError({ taskId, errorMessage }));
    } else if (type === 'createTaskValidation') {
      dispatch(setTaskCreateError(errorMessage));
    }
  }, [textForValidation, dispatch, taskId]);

  return (
    <div className={errorTipMessage === null ? s.tipNone : ''}>
      <div className={clsx(s.errorTip, className)}>{errorTipMessage}</div>
    </div>
  );
};
