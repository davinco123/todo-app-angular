import { createReducer, Action, on } from '@ngrx/store';
import { TodoListModel } from '../models/todo-lists.model';

import * as TodoListActions from './todo-lists.actions';

export interface State {
  todoList: TodoListModel[];
}

const initialState: State = {
  todoList: [],
};

export const todoReducer = createReducer(
  initialState,
  on(TodoListActions.setTodo, (state, payload) => ({
    ...state,
    todoList: payload.list,
  })),
  on(TodoListActions.addTodoCompleted, (state, payload) => ({
    ...state,
    todoList: [, ...state.todoList, payload.todo],
  })),
  on(TodoListActions.editTodoCompleted, (state, payload) => {
    const newTodoList = [...state.todoList].filter(
      (todo) => todo._id !== payload.todo._id
    );
    return { ...state, todoList: [...newTodoList, payload.todo] };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return todoReducer(state, action);
}
