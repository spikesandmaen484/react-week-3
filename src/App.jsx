import { useState } from 'react';
import './App.css';
import SignUp from './component/SignUp';
import LoginIn from './component/LoginIn';
import CheckOut from './component/CheckOut';
import LogOut from './component/LogOut';
import TodoList from './component/TodoList';

const url = 'https://todolist-api.hexschool.io';

function App() {
  const [token, setToken] = useState('');
  const [check, setCheck] = useState(false);
  

  return (
    <>
      <SignUp url={url} /> 
      <LoginIn setToken={setToken} url={url} />
      <CheckOut url={url} />
      <LogOut token={token} setToken={setToken} url={url} setCheck={setCheck} />
      <hr />
      <h2>Todo list</h2>
      <TodoList token={token} url={url} check={check} setCheck={setCheck} />
    </>
  )
}

export default App;
