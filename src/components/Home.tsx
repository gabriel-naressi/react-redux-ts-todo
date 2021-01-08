import React from 'react'
import NewTodo from '../features/todo/NewTodo'
import Footer from '../features/filter/Footer'
import VisibleTodoList from '../containers/VisibleTodoList'

const Home = () => (
  <div>
    <p>Home page</p>
    <Footer />
    <NewTodo />
    <VisibleTodoList />
  </div>
)

export default Home