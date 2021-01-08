import React from 'react'
import { Todo } from './todoSlice'

interface TodoItemProps {
  todo: Todo,
  onClickProp: (id: string) => void
}

const TodoItem = ({ todo, onClickProp } : TodoItemProps) => {
  return (
    <li
      style={{ textDecoration: todo.completed ? 'line-through' : 'none', marginBottom: 3}}
    >
      <button style={{marginRight: 15}} onClick={() => onClickProp(todo.id)}>X</button>
      {todo.title}
    </li>
  )
}

export default TodoItem