import { TodoListModel } from '../models/todo-lists.model';
import { TodoListStatus } from '../models/todo-lists.model';

import * as TodoListActions from './todo-lists.actions';

export interface State {
  todoList: TodoListModel[];
}

const initialState: State = {
  todoList: [
    new TodoListModel(
      'Workout for 30 minutes at the gym',
      TodoListStatus.INPROGRESS,
      0
    ),
    new TodoListModel(
      'Buy groceries (milk, vegetable, fruits, fish)',
      TodoListStatus.INPROGRESS,
      1
    ),
    new TodoListModel(
      'Clean the house and backyard',
      TodoListStatus.COMPLETED,
      2
    ),
    new TodoListModel(
      'Take the car to the auto shop for an oil change',
      TodoListStatus.REMOVED,
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

      if (newTodo.status === TodoListStatus.INPROGRESS)
        newTodo.status = TodoListStatus.REMOVED;
      else if (newTodo.status === TodoListStatus.REMOVED)
        newTodo.status = TodoListStatus.INPROGRESS;

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

      completeTodo.status = TodoListStatus.COMPLETED;
      const completedTodo = {
        ...todo,
        ...completeTodo,
      };

      completeTodoList[action.payload.id] = completedTodo;

      return {
        ...state,
        todoList: completeTodoList,
      };

    case TodoListActions.EDIT_TODO:
      const editTodoList = [...state.todoList];

      const todos = state.todoList[action.payload.id];
      const editTodo = { ...action.payload };

      const editedTodo = {
        ...todos,
        ...editTodo,
      };

      editTodoList[action.payload.id] = editedTodo;
      return {
        ...state,
        todoList: editTodoList,
      };
    default:
      return state;
  }
}
