import React from 'react'
import NewTodo from '../features/todo/NewTodo'
import Footer from '../features/filter/Footer'
import TodoList from '../features/todo/TodoList'

const Home = () => (
  <div>
    <p>Home page</p>
    <Footer />
    <NewTodo />
    <TodoList />
  </div>
)

export default Home