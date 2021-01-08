import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { useSelector } from 'react-redux'
import { increment, selectCount } from '../counter/counterSlice'

const mapDispatch = { increment }

const connector = connect(
  null,
  mapDispatch
)

type PropsFromRedux = ConnectedProps<typeof connector>
interface CounterProps extends PropsFromRedux {}

const Counter = ({ increment } : CounterProps) => {
  const count = useSelector(selectCount)
  //const dispatch = useDispatch()

  return (
    <div>
      <p>Counter page</p>
      {/*<button style={{marginRight: '5px'}} onClick={() => dispatch(increment())}>+</button>*/}
      <button style={{marginRight: '5px'}} onClick={() => increment()}>+</button>
      Clicked {count} times
    </div>
  )
}



export default connector(Counter)