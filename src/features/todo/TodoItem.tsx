import React from 'react'
import { Todo } from '../../commons/types'

interface TodoProps {
  todo: Todo
}

const TodoItem = ({ todo } : TodoProps) => (
  <li>{todo.description}</li>
);

export default TodoItem;