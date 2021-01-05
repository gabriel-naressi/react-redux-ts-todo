import React, { useState } from 'react'
import { FormEvent } from 'react'
import { useDispatch } from 'react-redux'
import { add } from '../../features/todo/todoSlice'

const NewTodo = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const submit = (e: FormEvent<any>) => {
    e.preventDefault();
    dispatch(add(value));
    setValue('');
  }

  return (
    <form onSubmit={submit}>
      Valor: {value} <br/>
      <input type="text" onChange={e => setValue(e.target.value)} value={value} />
    </form>
  )

};

export default NewTodo;