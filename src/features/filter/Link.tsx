import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../app/store'
import { setVisibilityFilter } from './filterSlice'

interface OwnProps {
  filter: string
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = { setVisibilityFilter }

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
)

type PropsFromRedux = ConnectedProps<typeof connector>
interface LinkProps extends PropsFromRedux {
  children: React.ReactNode;
  filter: string;
}

const Link = ({ active, children, setVisibilityFilter, filter }: LinkProps) => (
  <button
    onClick={() => setVisibilityFilter(filter)}
    disabled={active}
    style={{
      marginLeft: '4px'
    }}
  >
    {children}
  </button>
)

export default connector(Link)