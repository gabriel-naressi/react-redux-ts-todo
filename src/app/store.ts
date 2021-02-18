import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import todoReducer from '../features/todo/todoSlice'
import counterReducer from '../features/counter/counterSlice'
import visibilityFilter from '../features/filter/filterSlice'

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    counter: counterReducer,
    visibilityFilter: visibilityFilter
  },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
