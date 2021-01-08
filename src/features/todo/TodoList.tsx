import React from 'react'
import TodoItem from './TodoItem'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { TodoListProps } from '../containers/VisibleTodos'
import { Todo } from '../../commons/types'

const TodoList = ({ visibleTodos, onClickOnItem }: TodoListProps) => {
  const loadingTodos = useSelector((state: RootState) => state.todo.status)
  //const todoCount = useSelector((state: RootState) => Object.keys(state.todo.entities).length)
  //A linha acima também pode ser escrita assim:
  //const { status } = useSelector((state: RootState) => state.todo.status)
  //const todos = useSelector(selectTodos)

  return (
    <>
      {loadingTodos !== 'idle' ? <p>Loading...</p> : <></>}
      <ul style={{listStyle: 'none'}}>
        {
          visibleTodos.map(
            (todo : Todo) =>
              <TodoItem todo={todo} key={todo.id} onClickProp={onClickOnItem}/>
          )
        }
      </ul>
    </>
  )

}

export default TodoList