import React from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem'
import { selectTodos } from '../../features/todo/todoSlice'
import { RootState } from '../../app/store'

const TodoList = () => {
  const loadingTodos = useSelector((state: RootState) => state.todo.status)
  //A linha acima também pode ser escrita assim:
  //const { status } = useSelector((state: RootState) => state.todo.status)
  const todos = useSelector(selectTodos)

  return (
    <>
      {loadingTodos !== 'idle' ? <p>Loading...</p> : <></>}
      <ul>
        {todos.map(todo => <TodoItem todo={todo} key={todo.id} />)}
      </ul>
    </>
  )

}

export default TodoList