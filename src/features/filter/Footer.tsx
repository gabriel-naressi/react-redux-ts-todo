import React from 'react'
import { selectFilter } from '../filter/filterSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter, VisibilityFilters }  from '../filter/filterSlice'

const Footer = () => {
  const dispatch = useDispatch();
  const active = useSelector(selectFilter);
  return (
    <div>
      <span>Show: </span>
      <button
        style={{ marginLeft: '4px'}}
        onClick={() => dispatch(setFilter(VisibilityFilters.SHOW_ALL))}
        disabled={active === VisibilityFilters.SHOW_ALL}
      >
        All
      </button>
      <button
        style={{ marginLeft: '4px'}}
        onClick={() => dispatch(setFilter(VisibilityFilters.SHOW_ACTIVE))}
        disabled={active === VisibilityFilters.SHOW_ACTIVE}
      >
        Active
      </button>
      <button
        style={{marginLeft: '4px'}}
        onClick={() => dispatch(setFilter(VisibilityFilters.SHOW_COMPLETED))}
        disabled={active === VisibilityFilters.SHOW_COMPLETED}
      >
        Completed
      </button>
    </div>
  )

}

export default Footer