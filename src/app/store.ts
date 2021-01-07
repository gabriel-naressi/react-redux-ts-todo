import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice'
import counterReducer from '../features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    counter: counterReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
