import { nanoid } from '@reduxjs/toolkit'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchTodos, todoAdded, saveTodo, todoWasCreated, todoSliceReseted, creatingTodo} from './todoSlice'
import { useAppDispatch } from '../../app/store'

const NewTodo = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()

  const creating = useSelector(creatingTodo)
  const created = useSelector(todoWasCreated)

  const [todoText, setTodoText] = useState<string>('')
  const onChange = (e : React.FormEvent<HTMLInputElement>) => setTodoText(e.currentTarget.value)

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  useEffect(() => {
    if (created) {
      history.push('/counter')
      dispatch(todoSliceReseted())
    }
  }, [dispatch, history, created])

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
      {creating ? <p>Creating...</p> : <></>}
      <button onClick={() => addSync()}>Adicionar</button>
      <button onClick={() => addAssynchronously()}>Adicionar de maneira assíncrona</button>
    </form>
  )
}

export default NewTodo