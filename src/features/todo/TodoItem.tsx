import React from 'react'
import { Todo } from '../../commons/types'

interface TodoProps {
  todo: Todo
}

const TodoItem = ({ todo } : TodoProps) => (
  <li>{todo.title}</li>
)

export default TodoItem