import React from 'react'
import NewTodo from '../features/todo/NewTodo'
import TodoList from '../features/todo/TodoList'

export const Home = () => (
  <div>
    <p>Home page</p>
    <NewTodo />
    <TodoList />
  </div>
)