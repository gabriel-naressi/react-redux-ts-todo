import React from 'react'
import TodoItem from './TodoItem'
import { selectVisibleTodos } from '../filter/filterSlice'
import { useSelector } from 'react-redux';
import { RootState } from "../../app/store";

const TodoList = () => {
  const loadingTodos = useSelector((state: RootState) => state.todo.status)
  const todos = useSelector(selectVisibleTodos)
  //const todoCount = useSelector((state: RootState) => Object.keys(state.todo.entities).length)
  //A linha acima também pode ser escrita assim:
  //const { status } = useSelector((state: RootState) => state.todo.status)
  //const todos = useSelector(selectTodos)

  return (
    <>
      {loadingTodos !== 'idle' ? <p>Loading...</p> : <></>}
      <ul>
        { todos.map(todo => <TodoItem todo={todo} key={todo.id} />) }
      </ul>
    </>
  )

}

export default TodoList