import { Todo } from "../../commons/types"

export default class TodoService {
  getTodos = (): Promise<Response> => {
    return fetch("https://jsonplaceholder.typicode.com/todos?userId=1")
  }
  saveTodo = (todo: Todo): Promise<Response> => {
    return fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
  }
}