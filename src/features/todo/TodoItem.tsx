import React from 'react'
import { useAppDispatch } from '../../app/store'
import { todoDeleted } from './todoSlice'
import { Todo } from './todoSlice'

const TodoItem = ({ todo } : { todo: Todo}) => {
  const dispatch = useAppDispatch()
  return (
    <li
      style={{ textDecoration: todo.completed ? 'line-through' : 'none', marginBottom: 3}}
    >
      <button style={{marginRight: 15}} onClick={() => dispatch(todoDeleted(todo.id))}>X</button>
      {todo.title}
    </li>
  )
}

export default TodoItem