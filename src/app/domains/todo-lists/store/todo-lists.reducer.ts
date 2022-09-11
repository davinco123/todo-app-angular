import { TodoListItem } from '../models/todo-lists.model';

import * as TodoListActions from './todo-lists.actions';

export interface State {
  todoList: TodoListItem[];
  isCompleted: boolean;
  isRemoved: boolean;
  isInProgress: boolean;
}

const initialState: State = {
  todoList: [
    new TodoListItem('Do something'),
    new TodoListItem('Make dinner'),
    new TodoListItem('Do house chores'),
  ],
  isCompleted: false,
  isInProgress: true,
  isRemoved: false,
};

export function todoListReducer(
  state: State = initialState,
  action: TodoListActions.TodoListActionsType
) {
  switch (action.type) {
    case TodoListActions.ADD_TODO:
      return {
        ...state,
        todoItem: [...state.todoList, action.payload],
      };

    default:
      return state;
  }
}
