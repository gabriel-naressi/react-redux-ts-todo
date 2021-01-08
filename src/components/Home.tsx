import React from 'react'
import NewTodo from '../features/todo/NewTodo'
import Footer from '../features/filter/Footer'
import VisibleTodos from '../features/containers/VisibleTodos'

const Home = () => (
  <div>
    <p>Home page</p>
    <Footer />
    <NewTodo />
    <VisibleTodos />
  </div>
)

export default Home