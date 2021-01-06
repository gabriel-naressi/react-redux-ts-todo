import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { add, addAssync, fetchTodos } from '../../features/todo/todoSlice'

const NewTodo = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const addSync = () => {
    dispatch(add(value));
    setValue('');
  }

  const addAssynchronously = () => {
    dispatch(addAssync(value));
    setValue('');
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); }}>
      Valor: {value} <br/>
      <input type="text" onChange={e => setValue(e.target.value)} value={value} />
      <button onClick={() => addSync()}>Adicionar</button>
      <button onClick={() => addAssynchronously()}>Adicionar de maneira assíncrona</button>
    </form>
  )

};

export default NewTodo;