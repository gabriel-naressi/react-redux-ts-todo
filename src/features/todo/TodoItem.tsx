import React from 'react'
import { Todo } from '../../commons/types'

interface TodoProps {
  todo: Todo,
  onClick: any
}

const TodoItem = ({ todo } : TodoProps) => (
  <li
    style={{
      textDecoration: todo.completed ? 'line-through' : 'none'
    }}
  >{todo.title}</li>
)

export default TodoItem