import { TodoListModel } from '../models/todo-lists.model';

import * as TodoListActions from './todo-lists.actions';

export interface State {
  todoList: TodoListModel[];
}

const initialState: State = {
  todoList: [
    new TodoListModel('Workout for 30 minutes at the gym', 'inProgress'),
    new TodoListModel(
      'Buy groceries (milk, vegetable, fruits, fish)',
      'inProgress'
    ),
    new TodoListModel('Clean the house and backyard', 'completed'),
    new TodoListModel(
      'Take the car to the auto shop for an oil change',
      'removed'
    ),
  ],
};

export function todoListReducer(
  state: State = initialState,
  action: TodoListActions.TodoListActionsType
) {
  switch (action.type) {
    case TodoListActions.ADD_TODO:
      console.log(state.todoList);
      return {
        ...state,
        todoList: [...state.todoList, action.payload],
      };
    case TodoListActions.REMOVE_TODO:
      const todoLists = [...state.todoList];
      const index = todoLists.indexOf(action.payload);

      const oldTodo = state.todoList[index];
      const newTodo = { ...action.payload };
      newTodo.mode = 'removed';
      const updatedTodo = {
        ...oldTodo,
        ...newTodo,
      };
      todoLists[index] = updatedTodo;

      return {
        ...state,
        todoList: todoLists,
      };
    default:
      return state;
  }
}
