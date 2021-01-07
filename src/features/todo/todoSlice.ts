import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { Todo } from '../../commons/types';
import TodoService from '../../services/todo/TodoService';

const service = new TodoService();
const todosAdapter = createEntityAdapter<Todo>();

let nextId = 0;

type TodoState = { entities: Todo[], status: string }

const initialState = todosAdapter.getInitialState({
  entities: [],
  status: 'idle'
} as TodoState );

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
/*export const addAssync = (title: string) : AppThunk => dispatch => {
  setTimeout(() => {
    dispatch(add(title));
  }, 2000);
}*/

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await service.getTodos();
  return response.data;
})

/*export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    //Descobrir uma forma de fazer a chamada por serviço
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos`)
    return (await response.json())
  }
)*/

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {

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
  }
});

//export const { add } = todoSlice.actions;

export const {
  selectAll: selectTodos,
} = todosAdapter.getSelectors<RootState>(
  (state) => state.todo
)

export default todoSlice.reducer;