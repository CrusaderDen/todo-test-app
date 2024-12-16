import './App.css';
import { Todolist } from '@/components/todolist/todolist';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { getTodolistsThunk } from '@/store/thunks';

function App() {
  const todoLists = useAppSelector(state => state.todolists);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTodolistsThunk());
  }, [dispatch]);
  return (
    <div>
      {todoLists.map(todolist => (
        <Todolist key={todolist.id} todolist={todolist} />
      ))}
    </div>
  );
}

export default App;
