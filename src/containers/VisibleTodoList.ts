import { connect } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { toggleTodo } from '../features/todo/todoSlice'
import TodoList from '../features/todo/TodoList'
import { VisibilityFilters } from '../features/filter/filterSlice'
import { RootState } from '../app/store'

const selectTodos = (state: RootState) => state.todo.entities
const selectFilter = (state: RootState) => state.visibilityFilter

const selectVisibleTodos = createSelector(
  [selectTodos, selectFilter],
  (todos, filter) => {
    switch (filter) {
      case VisibilityFilters.SHOW_ALL:
        return Object.values(todos)
      case VisibilityFilters.SHOW_COMPLETED:
        return Object.values(todos).filter(t => t?.completed)
      case VisibilityFilters.SHOW_ACTIVE:
        return Object.values(todos).filter(t => !t?.completed)
      default:
        throw new Error('Unknown filter: ' + filter)
    }
  }
)

const mapState = (state : RootState) => ({
  visibleTodos: selectVisibleTodos(state)
})

const mapDispatch = {
  toggleTodo: toggleTodo
}

const connector = connect(
  mapState,
  mapDispatch
)

export default connector(TodoList)