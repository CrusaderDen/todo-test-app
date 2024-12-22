import s from './error-tip.module.scss';

export const ErrorTip = ({ message }: { message: string }) => {
  return <div className={s.errorTip}>{message}</div>;
};
