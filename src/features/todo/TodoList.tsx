import React from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem'
import { selectTodos } from '../../features/todo/todoSlice'

const TodoList = () => {
  const todos = useSelector(selectTodos);
  return (
    <ul>
      {todos.map(todo => <TodoItem todo={todo} key={todo.id} />)}
    </ul>
  );

};

export default TodoList;