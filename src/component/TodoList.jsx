import { useState, useEffect } from "react";
import axios from 'axios';

const TodoList = ({ token, url, check, setCheck }) => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [todoEdit, setTodoEdit] = useState({});
    const [nickname, setNickname] = useState("");

    useEffect(() => {
        checkLogin();
      }, [token]);


    const checkLogin = async() => {
        try {
            const response = await axios.get(`${url}/users/checkout`, {
                headers: {
                    Authorization: token
                }
            });

            setNickname(response.data.nickname);
            setCheck(true);
            getTodos();
        } catch (error) {
            setNickname(error.message);
            setCheck(false);
        }
	};

    const getTodos = async () => {
        try {
            const response = await axios.get(`${url}/todos`, {
                headers: {
                    Authorization: token
                }
            });
            setTodos(response.data.data);
        } catch (error) {
            setTodos(error.message);
        }
        
    };
    
    const addTodo = async () => {
        if (!newTodo) return;

        const todo = {
            content: newTodo
        };
        await axios.post(`${url}/todos`, todo, {
            headers: {
                Authorization: token
            }
        });
        setNewTodo('');
        getTodos();
    };
    
    const deleteTodo = async (id) => {
        await axios.delete(`${url}/todos/${id}`, {
            headers: {
                Authorization: token
            }
        });
        getTodos();
    };
    
    const updateTodo = async (id) => {
        const todo = todos.find((todo) => todo.id === id);

        todo.content = todoEdit[id];
        await axios.put(`${url}/todos/${id}`, todo, {
            headers: {
                Authorization: token
            }
        });
        getTodos();
        setTodoEdit({
            ...todoEdit,
            [id]: ''
        });
    };
    
    const toggleStatus = async (id) => {
        await axios.patch(
            `${url}/todos/${id}/toggle`,
            {},
            {
                headers: {
                    Authorization: token
                }
            },
        );
        getTodos();
    };

    return(<div id="todoListPage">
        <div className="container">
            <div>
                {check === false ? <h2 className="not-login-text">無法操作待辦清單，請先登入</h2> :
                (
                    <>
                        <h2 className="not-login-text">{nickname} -- 待辦清單</h2>
                        <input type="text" id="newTodo" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder='請輸入 New Todo' />
                        <button onClick={addTodo}>新增</button>
                        <ul>
                            {todos.map((todo, index) => (
                                <li key={index}>
                                    {todo.content} {todo.status ? '完成' : '未完成'}
                                    | {todoEdit[todo.id]}
                                    <input type="text" placeholder='更新值' onChange={
                                        (e) => {
                                            const newTodoEdit = {
                                                ...todoEdit
                                            }
                                            newTodoEdit[todo.id] = e.target.value;
                                            setTodoEdit(newTodoEdit);
                                        }
                                    } />
                                    <button onClick={() => deleteTodo(todo.id)}>刪除</button>
                                    <button onClick={() => updateTodo(todo.id)}>更新</button>
                                    <button onClick={() => toggleStatus(todo.id)}>
                                        切換狀態
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
                
            </div>
        </div>
    </div>)
}

export default TodoList;