import { TodoListModel } from '../models/todo-lists.model';

import * as TodoListActions from './todo-lists.actions';

export interface State {
  todoList: TodoListModel[];
}

const initialState: State = {
  todoList: [
    new TodoListModel('Workout for 30 minutes at the gym', true, false, false),
    new TodoListModel(
      'Buy groceries (milk, vegetable, fruits, fish)',
      true,
      false,
      false
    ),
    new TodoListModel('Clean the house and backyard', false, true, false),
    new TodoListModel(
      'Take the car to the auto shop for an oil change',
      false,
      false,
      true
    ),
  ],
};

export function todoListReducer(
  state: State = initialState,
  action: TodoListActions.TodoListActionsType
) {
  switch (action.type) {
    case TodoListActions.ADD_TODO:
      return {
        ...state,
        todoList: [action.payload],
      };

    default:
      return state;
  }
}
