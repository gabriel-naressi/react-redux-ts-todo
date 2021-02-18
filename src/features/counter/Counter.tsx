import React from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../app/store'
import { increment, counterSelector } from './counterSlice'

const Counter = () => {
  const dispatch = useAppDispatch()
  const { value } = useSelector(counterSelector)

  return (
    <div>
      <p>Counter page</p>
      <button style={{marginRight: '5px'}} onClick={() => dispatch(increment())}>+</button>
      Clicked {value} times
    </div>
  )
}

export default Counter