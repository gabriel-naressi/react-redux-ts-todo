import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
//import { todoAdded, addAssync, fetchTodos } from '../../features/todo/todoSlice'
import { fetchTodos } from '../../features/todo/todoSlice'

const NewTodo = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  /*const addSync = () => {
    dispatch(todoAdded(value));
    setValue('');
  }

  const addAssynchronously = () => {
    dispatch(addAssync(value));
    setValue('');
  }*/

  return (
    <form onSubmit={(e) => { e.preventDefault(); }}>
      Valor: {value} <br/>
      <input type="text" onChange={e => setValue(e.target.value)} value={value} />
      {/*<button onClick={() => addSync()}>Adicionar</button>
      <button onClick={() => addAssynchronously()}>Adicionar de maneira assíncrona</button>*/}
    </form>
  )

};

export default NewTodo;