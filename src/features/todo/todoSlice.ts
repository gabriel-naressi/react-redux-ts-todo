import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  PayloadAction
} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Todo } from '../../commons/types'
import TodoService from '../../services/todo/TodoService'

const service = new TodoService()
const todosAdapter = createEntityAdapter<Todo>()

interface TodoState {
  entities: Todo[],
  status: string,
  created: boolean,
  creating: boolean
}

const initialState = todosAdapter.getInitialState({
  entities: {},
  status: 'idle',
  created: false,
  creating: false
} as TodoState)

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await service.getTodos()
  //TODO return (await response.json()) as Returned
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
    todoDeleted: todosAdapter.removeOne,
    toggleTodo(state, action: PayloadAction<string>) {
      const todo = state.entities.find((todo : Todo) => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    reset: (state) => {
      state.created = false
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        todosAdapter.setAll(state, action.payload)
        state.status = 'idle'
      })
      .addCase(saveTodo.pending, (state, action) => {
        state.creating = true
      })
      .addCase(saveTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        todosAdapter.addOne(state, action.payload)
        state.creating = false
        state.created = true
      })
  }
})

export const { todoAdded, toggleTodo, todoDeleted, reset } = todoSlice.actions

//selectors.selectAll
// Alias selectTodos for 'selectAll' created selector
export const {
  selectAll: selectTodos,
} = todosAdapter.getSelectors<RootState>(
  (state) => state.todo
)

export const todoWasCreated = (state: RootState) => state.todo.created;
export const creatingTodo = (state: RootState) => state.todo.creating;
export const todoStatus = (state: RootState) => state.todo.status;

/*This export also coulde be:

export const selectors = todosAdapter.getSelectors<RootState>(
  (state) => state.todo
)

And the use is:
  import { selectors } from '../../features/todo/todoSlice'
  const todos = useSelector(selectors.selectAll)
*/

export default todoSlice.reducer