import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

interface CounterState {
  value: number
}

const initialState: CounterState = { value: 0 }

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
    decrement(state) {
      state.value--
    }
  }
})

export const { increment, decrement } = counterSlice.actions
export default counterSlice.reducer

export const counterSelector = (state: RootState) => state.counter