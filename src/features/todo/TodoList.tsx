import React from 'react'
import TodoItem from './TodoItem'
import { Todo } from '../../commons/types'

/*
const TodoList = () => {
  //const loadingTodos = useSelector((state: RootState) => state.todo.status)
  //const todoCount = useSelector((state: RootState) => Object.keys(state.todo.entities).length)
  //A linha acima também pode ser escrita assim:
  //const { status } = useSelector((state: RootState) => state.todo.status)
  const todos = useSelector(selectTodos)

  return (
    <>
      Quantidade de tarefas sendo exibidas: {todoCount}
      <Filter />
      loadingTodos !== 'idle' ? <p>Loading...</p> : <></>
      <ul>
        {todos.map(todo => <TodoItem todo={todo} key={todo.id} />)}
      </ul>
    </>
  )

}*/

interface TodoListProps {
  visibleTodos: (Todo | undefined)[]
}

const TodoList = ({ visibleTodos, toggleTodo }: any) => (
  <ul>
    {visibleTodos.map((todo : Todo) => (
      <TodoItem key={todo.id} todo={todo} onClick={() => toggleTodo(todo.id)} />
    ))}
  </ul>
)

export default TodoList