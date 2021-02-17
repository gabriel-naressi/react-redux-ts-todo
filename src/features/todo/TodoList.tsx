import React, { useState, FormEvent } from 'react'
import TodoItem from './TodoItem'
import { useSelector } from 'react-redux'
import { todoStatus } from '../todo/todoSlice'
import { selectByDescription } from '../filter/filterSlice'
import { Todo } from './todoSlice'
import { RootState } from '../../app/store'

const TodoList = () => {
  const loadingTodos = useSelector(todoStatus)
  const [searchText, setSearchText] = useState<string>('')
  const onChange = (e : FormEvent<HTMLInputElement>) => setSearchText(e.currentTarget.value)
  const filteredTodos = useSelector((state: RootState) => selectByDescription(state, searchText))

  return (
    <>
      <input placeholder="Faça sua pesquisa" type="search" onChange={onChange} value={searchText} />
      {loadingTodos !== 'idle' ? <p>Loading...</p> : <></>}
      <ul style={{listStyle: 'none'}}>
        {
          filteredTodos.map((todo : Todo) => <TodoItem todo={todo} key={todo.id} />)
        }
      </ul>
    </>
  )

}

export default TodoList