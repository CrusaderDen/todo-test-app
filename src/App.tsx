import './App.css';
import { Todolist } from '@/components/todolist/todolist';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { getTodolistsThunk } from '@/store/thunks';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import './../nprogress.scss';
import { useProgressBar } from '@/utils/useProgressBar';

nProgress.configure({ showSpinner: false, trickle: false });

function App() {
  const todolists = useAppSelector(state => state.todolists.todolists);
  const loading = useAppSelector(state => state.app.loading);
  const error = useAppSelector(state => state.app.error);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTodolistsThunk());
  }, [dispatch]);

  useProgressBar(loading, error);

  return (
    <div>
      {todolists.map(todolist => (
        <Todolist key={todolist.id} todolist={todolist} />
      ))}
    </div>
  );
}

export default App;
