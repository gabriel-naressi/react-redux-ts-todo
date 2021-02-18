import { createSlice, createAsyncThunk, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import TodoService from '../../services/todo/TodoService'

const service = new TodoService()
const todosAdapter = createEntityAdapter<Todo>()

export type Todo = {
  readonly userId?: number,
  readonly id: string,
  title: string,
  completed: Boolean
}

interface TodoState {
  entities: Todo[],
  status: string,
  created: boolean,
  creating: boolean
}

const initialState = () => todosAdapter.getInitialState({
  entities: {},
  status: 'idle',
  created: false,
  creating: false
} as TodoState)

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await service.getTodos()
  return await response.json()
})

export const saveTodo = createAsyncThunk('todos/saveNewTodo', async (todo: Todo)  => {
  const response = await service.saveTodo(todo)
  return await response.json()
})

export const todoSlice = createSlice({
  name: 'todo',
  initialState: initialState(),
  reducers: {
    todoAdded: todosAdapter.addOne,
    todoDeleted: todosAdapter.removeOne,
    toggleTodo(state, action: PayloadAction<string>) {
      const todo = state.entities.find((todo : Todo) => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    todoSliceReseted: (state) => initialState()
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

export const { todoAdded, toggleTodo, todoDeleted, todoSliceReseted } = todoSlice.actions

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

export const todosSelector = (state: RootState) => state.todo;

export default todoSlice.reducer