import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Todo } from '../../commons/types'
import TodoService from '../../services/todo/TodoService'

const service = new TodoService()
const todosAdapter = createEntityAdapter<Todo>()

interface TodoState {
  entities: Todo[],
  status: string,
  creating: boolean
}

const initialState = todosAdapter.getInitialState({
  entities: {},
  status: 'idle',
  creating: false,
} as TodoState )

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
/*export const addAssync = (title: string) : AppThunk => dispatch => {
  setTimeout(() => {
    dispatch(add(title))
  }, 2000)
}*/

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await service.getTodos()
  //TODO
  //return (await response.json()) as Returned
  return (await response.json())
})

export const saveTodo = createAsyncThunk('todos/saveNewTodo', async (todo: Todo)  => {
  const response = await service.saveTodo(todo)
  return (await response.json())
})

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    todoAdded: todosAdapter.addOne,
    toggleTodo(state, action) {
      const todo = state.entities.find((todo : Todo) => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        todosAdapter.setAll(state, action.payload)
        state.status = 'idle'
      })
      .addCase(saveTodo.pending, (state, action) => {
        state.creating = true
      })
      .addCase(saveTodo.fulfilled, (state, action) => {
        todosAdapter.addOne(state, action.payload)
        state.creating = false
      })
  }
})

export const { todoAdded, toggleTodo } = todoSlice.actions

//selectors.selectAll
// Alias selectTodos for 'selectAll' created selector
export const {
  selectAll: selectTodos,
} = todosAdapter.getSelectors<RootState>(
  (state) => state.todo
)

/*This export also coulde be:

export const selectors = todosAdapter.getSelectors<RootState>(
  (state) => state.todo
)

And the use is:
  import { selectors } from '../../features/todo/todoSlice'
  const todos = useSelector(selectors.selectAll)
*/

export default todoSlice.reducer