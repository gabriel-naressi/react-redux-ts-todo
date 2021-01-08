import { connect } from 'react-redux'
import { RootState } from '../../app/store'
import { setVisibilityFilter } from './filterSlice'
import Link from './Link'

const mapStateToProps = (state: RootState, ownProps: any) => ({
  active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = { setVisibilityFilter }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)