import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { selectTodos, Todo } from '../todo/todoSlice'

export enum VisibilityFilters {
  SHOW_ALL = 'SHOW_ALL',
  SHOW_COMPLETED = 'SHOW_COMPLETED',
  SHOW_ACTIVE = 'SHOW_ACTIVE',
}

export const filtersSlice = createSlice({
  name: 'visibilityFilter',
  initialState: VisibilityFilters.SHOW_ALL,
  reducers: {
    setFilter: (state, action: PayloadAction<VisibilityFilters>) => {
      return action.payload
    },
  },
})

export const { setFilter } = filtersSlice.actions

export const selectFilter = (state: RootState) => state.visibilityFilter
export const selectVisibleTodos = createSelector(
  [selectTodos, selectFilter],
  (todos: Todo[], filter : VisibilityFilters) => {
    switch (filter) {
      case VisibilityFilters.SHOW_ALL:
        return todos
      case VisibilityFilters.SHOW_COMPLETED:
        return todos.filter((todo) => todo.completed)
      case VisibilityFilters.SHOW_ACTIVE:
        return todos.filter((todo) => !todo.completed)
      default:
        return todos
    }
  }
)

export const selectByDescription = createSelector(
  [selectVisibleTodos, (state: RootState, searchText: string) => searchText],
  (todos: Todo[], value: string) => {
    return todos.filter((todo) => todo.title.includes(value))
  }
)

export default filtersSlice.reducer