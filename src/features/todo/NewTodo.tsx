import { nanoid } from '@reduxjs/toolkit'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { RootState } from '../../app/store'
import { fetchTodos, todoAdded, saveTodo } from './todoSlice'

const NewTodo = () => {
  const creatingTodo = useSelector((state: RootState) => state.todo.creating)
  const dispatch = useDispatch()

  const [todoText, setTodoText] = useState<string>('')
  const onChange = (e : React.FormEvent<HTMLInputElement>) => setTodoText(e.currentTarget.value)

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  const addAssynchronously = () => {
    dispatch(saveTodo({
      userId: 1,
      id: nanoid(),
      title: todoText,
      completed: false
    }))
    setTodoText('')
  }

  const addSync = () => {
    dispatch(todoAdded({
      userId: 1,
      id: nanoid(),
      title: todoText,
      completed: false
    }))
    setTodoText('')
  }

  return (
    <form onSubmit={e => { e.preventDefault() }}>
      Valor: {todoText} <br/>
      <input type="text" onChange={onChange} value={todoText} />
      {creatingTodo ? <p>Creating...</p> : <></>}
      <button onClick={() => addSync()}>Adicionar</button>
      <button onClick={() => addAssynchronously()}>Adicionar de maneira assíncrona</button>
    </form>
  )
}

export default NewTodo