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

    case TodoListActions.UPDATE_TODO:
      const newTodoLists = [...state.todoList];
      const index = newTodoLists.indexOf(action.payload);

      const oldTodo = state.todoList[index];
      const newTodo = { ...action.payload };

      if (newTodo.mode === 'inProgress') newTodo.mode = 'removed';
      else if (newTodo.mode === 'removed') newTodo.mode = 'inProgress';

      const updatedTodo = {
        ...oldTodo,
        ...newTodo,
      };

      newTodoLists[index] = updatedTodo;

      return {
        ...state,
        todoList: newTodoLists,
      };

    case TodoListActions.COMPLETE_TODO:
      const completeTodoList = [...state.todoList];
      const stateIndex = completeTodoList.indexOf(action.payload);

      const todo = state.todoList[stateIndex];
      const completeTodo = { ...action.payload };

      completeTodo.mode = 'completed';
      const completedTodo = {
        ...todo,
        ...completeTodo,
      };

      completeTodoList[stateIndex] = completedTodo;

      return {
        ...state,
        todoList: completeTodoList,
      };
    default:
      return state;
  }
}
