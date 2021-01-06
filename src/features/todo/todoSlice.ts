import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { Todo } from '../../commons/types';
import TodoService from '../../services/todo/TodoService';

const service = new TodoService();
const todosAdapter = createEntityAdapter<Todo>();

let nextId = 0;

interface TodoState {
  todos: Todo[]
  status: string
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const addAssync = (title: string) : AppThunk => dispatch => {
  setTimeout(() => {
    dispatch(add(title));
  }, 2000);
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await service.getTodos();
  return response.data;
})

export const todoSlice = createSlice({
  name: 'todo',
  initialState: todosAdapter.getInitialState({
    todos: [],
    status: 'idle'
  } as TodoState),
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      //createSlice allows us to safely "mutate" our state
      state.todos.push({
        userId: 1,
        id: nextId,
        title: action.payload,
        completed: false,
      });
      nextId++;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        todosAdapter.setAll(state, action.payload)
        state.status = 'idle'
        console.log(action.payload);
      })
  }
});

export const { add } = todoSlice.actions;

/*const todoSelectors = todosAdapter.getSelectors<RootState>(
  (state) => state.todo
)

export const selectTosdos = todoSelectors.selectAll(store.getState())*/

export const selectTodos = (state: RootState) => state.todo.todos;

export default todoSlice.reducer;