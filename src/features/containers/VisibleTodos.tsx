import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../app/store'
import TodoList from '../todo/TodoList'
import { selectVisibleTodos } from '../filter/filterSlice'
import { todoDeleted } from '../todo/todoSlice'

const mapState = (state: RootState) => ({
  visibleTodos: selectVisibleTodos(state)
})

const mapDispatch = {
  onClickOnItem: todoDeleted
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

export interface TodoListProps extends PropsFromRedux {}
export default connector(TodoList)