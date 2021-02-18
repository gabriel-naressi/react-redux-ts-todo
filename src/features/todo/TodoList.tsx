import React, { useState, FormEvent } from 'react'
import TodoItem from './TodoItem'
import { useSelector } from 'react-redux'
import { todosSelector } from './todoSlice'
import { selectByDescription } from '../filter/filterSlice'
import { Todo } from './todoSlice'
import { RootState } from '../../app/store'

const TodoList = () => {
  const { status } = useSelector(todosSelector)
  const [searchText, setSearchText] = useState<string>('')
  const onChange = (e : FormEvent<HTMLInputElement>) => setSearchText(e.currentTarget.value)
  const filteredTodos = useSelector((state: RootState) => selectByDescription(state, searchText))

  return (
    <>
      <input placeholder="Faça sua pesquisa" type="search" onChange={onChange} value={searchText} />
      {status !== 'idle' ? <p>Loading...</p> : <></>}
      <ul style={{listStyle: 'none'}}>
        {
          filteredTodos.map((todo : Todo) => <TodoItem todo={todo} key={todo.id} />)
        }
      </ul>
    </>
  )

}

export default TodoList