import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  PayloadAction
} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import TodoService from '../../services/todo/TodoService'
import { normalize, schema } from 'normalizr'

const todoSchema = new schema.Entity('todos')
const todoListSchema = [todoSchema]

const service = new TodoService()
const todosAdapter = createEntityAdapter<Todo>()

export type Todo = {
  userId?: number,
  id: string,
  title: string,
  completed: Boolean
}

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
  const data = (await response.json())
  //TODO return (await response.json()) as Returned
  const normalized = normalize<
    any,
    {
      todos: { [key: string]: Todo }
    }
  >(data, todoListSchema)
  return normalized.entities
})

export const saveTodo = createAsyncThunk('todos/saveNewTodo', async (todo: Todo)  => {
  const response = await service.saveTodo(todo)
  const data = (await response.json())
  const normalized = normalize<
    any,
    {
      todos: { [key: string]: Todo }
    }
  >(data, todoSchema)
  return normalized;
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
      .addCase(fetchTodos.fulfilled, (state, action) => {
        todosAdapter.setAll(state, action.payload.todos)
        state.status = 'idle'
      })
      .addCase(saveTodo.pending, (state, action) => {
        state.creating = true
      })
      .addCase(saveTodo.fulfilled, (state, action) => {
        todosAdapter.addOne(state, action.payload.entities.todos[action.payload.result])
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