import React from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../app/store'
import { increment, selectCount } from '../counter/counterSlice'

const Counter = () => {
  const dispatch = useAppDispatch()
  const count = useSelector(selectCount)

  return (
    <div>
      <p>Counter page</p>
      <button style={{marginRight: '5px'}} onClick={() => dispatch(increment())}>+</button>
      Clicked {count} times
    </div>
  )
}

export default Counter