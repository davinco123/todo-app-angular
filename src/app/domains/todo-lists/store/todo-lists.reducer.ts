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
      const newTodoList = [...state.todoList].filter(
        (todo) => todo._id !== action.payload._id
      );

      return {
        ...state,
        todoList: [...newTodoList, action.payload],
      };

    default:
      return state;
  }
}
