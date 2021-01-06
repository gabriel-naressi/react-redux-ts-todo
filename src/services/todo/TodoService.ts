import axios, { AxiosResponse } from "axios";
import { Todo } from "../../commons/types";

export default class TodoService {
  getTodos = (): Promise<AxiosResponse<Todo[]>> => {
    return axios.get('https://jsonplaceholder.typicode.com/todos');
  }
}