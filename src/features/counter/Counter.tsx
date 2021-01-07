import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, selectCount } from '../counter/counterSlice'

export const Counter = () => {
  const count = useSelector(selectCount)
  const dispatch = useDispatch()

  return (
    <div>
      <p>Counter page</p>
      <button style={{marginRight: '5px'}} onClick={() => dispatch(increment())}>+</button>
      Clicked {count} times
    </div>
  )
}