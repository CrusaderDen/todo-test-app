import './App.css';
import { Todolist } from '@/components/todolist/todolist';
import { useAppSelector } from '@/store/hooks';

function App() {
  const todoLists = useAppSelector(state => state.todolists);
  return (
    <div>
      {todoLists.map(todolist => (
        <Todolist key={todolist.id} todolist={todolist} />
      ))}
    </div>
  );
}

export default App;
