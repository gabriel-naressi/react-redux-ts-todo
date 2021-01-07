import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { RootState } from '../../app/store';
import { fetchTodos, todoAdded, saveTodo } from '../../features/todo/todoSlice'

const NewTodo = () => {
  const creatingTodo = useSelector((state: RootState) => state.todo.creating);
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const addAssynchronously = () => {
    dispatch(saveTodo({
      userId: 1,
      id: Math.random(),
      title: value,
      completed: false
    }))
    setValue('');
  }

  const addSync = () => {
    dispatch(todoAdded({
      userId: 1,
      id: Math.random(),
      title: value,
      completed: false
    }))
    setValue('');
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); }}>
      Valor: {value} <br/>
      <input type="text" onChange={e => setValue(e.target.value)} value={value} />
      {creatingTodo ? <p>Creating...</p> : <></>}
      <button onClick={() => addSync()}>Adicionar</button>
      <button onClick={() => addAssynchronously()}>Adicionar de maneira assíncrona</button>
    </form>
  )

};

export default NewTodo;