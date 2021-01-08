import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter, VisibilityFilters }  from '../filter/filterSlice'

const Footer = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <span>Show: </span>
      <button style={{ marginLeft: '4px'}} onClick={() => dispatch(setFilter(VisibilityFilters.SHOW_ALL))}>
        All
      </button>
      <button style={{ marginLeft: '4px'}} onClick={() => dispatch(setFilter(VisibilityFilters.SHOW_ACTIVE))}>
        Active
      </button>
      <button style={{marginLeft: '4px'}} onClick={() => dispatch(setFilter(VisibilityFilters.SHOW_COMPLETED))}>
        Completed
      </button>
    </div>
  )

}

export default Footer