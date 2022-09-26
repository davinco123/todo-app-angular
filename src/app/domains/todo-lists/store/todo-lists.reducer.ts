import { TodoListModel } from '../models/todo-lists.model';

import * as TodoListActions from './todo-lists.actions';

export interface State {
  todoList: TodoListModel[];
}

const initialState: State = {
  todoList: [],
};

export function todoListReducer(
  state: State = initialState,
  action: TodoListActions.TodoListActionsType
) {
  switch (action.type) {
    case TodoListActions.SET_TODO:
      return {
        ...state,
        todoList: action.payload,
      };

    case TodoListActions.ADD_TODO_COMPLETED:
      return {
        ...state,
        todoList: [...state.todoList, action.payload],
      };

    case TodoListActions.EDIT_TODO_COMPLETED:
      const oldTodoList = [...state.todoList];
      const todo = { ...action.payload };
      const index = oldTodoList.findIndex(
        (oldTodo) => oldTodo._id === todo._id
      );

      const oldTodo = oldTodoList[index];
      const newTodo = {
        ...oldTodo,
        ...action.payload,
      };

      oldTodoList[index] = newTodo;
      return {
        ...state,
        todoList: oldTodoList,
      };

    case TodoListActions.REMOVE_TODO:
      const todoLists = [...state.todoList];
      const todos = { ...action.payload };
      const ind = todoLists.findIndex((todo) => todo._id === todos._id);

      todoLists.splice(ind, 1);

      return {
        ...state,
        todoList: todoLists,
      };

    default:
      return state;
  }
}
