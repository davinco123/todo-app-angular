import { TodoListModel } from '../models/todo-lists.model';

import * as TodoListActions from './todo-lists.actions';

export interface State {
  todoList: TodoListModel[];
}

const initialState: State = {
  todoList: [
    new TodoListModel('Workout for 30 minutes at the gym', 'inprogress', 0),
    new TodoListModel(
      'Buy groceries (milk, vegetable, fruits, fish)',
      'inprogress',
      1
    ),
    new TodoListModel('Clean the house and backyard', 'completed', 2),
    new TodoListModel(
      'Take the car to the auto shop for an oil change',
      'removed',
      3
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

    case TodoListActions.UPDATE_TODO:
      const updatedTodoLists = [...state.todoList];

      const oldTodo = state.todoList[action.payload.id];
      const newTodo = { ...action.payload };

      if (newTodo.mode === 'inprogress') newTodo.mode = 'removed';
      else if (newTodo.mode === 'removed') newTodo.mode = 'inprogress';

      const updatedTodo = {
        ...oldTodo,
        ...newTodo,
      };
      updatedTodoLists[action.payload.id] = updatedTodo;
      return {
        ...state,
        todoList: updatedTodoLists,
      };

    case TodoListActions.COMPLETE_TODO:
      const completeTodoList = [...state.todoList];

      const todo = state.todoList[action.payload.id];
      const completeTodo = { ...action.payload };

      completeTodo.mode = 'completed';
      const completedTodo = {
        ...todo,
        ...completeTodo,
      };

      completeTodoList[action.payload.id] = completedTodo;

      return {
        ...state,
        todoList: completeTodoList,
      };
    default:
      return state;
  }
}
