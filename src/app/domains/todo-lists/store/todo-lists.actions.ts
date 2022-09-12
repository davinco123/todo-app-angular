import { Action } from '@ngrx/store';

import { TodoListModel } from '../models/todo-lists.model';

export const ADD_TODO = '[Todo List] Add Todo';
export const REMOVE_TODO = '[Todo List] Remove Todo';

export class AddTodo implements Action {
  readonly type = ADD_TODO;

  constructor(public payload: TodoListModel) {}
}

export class RemoveTodo implements Action {
  readonly type = REMOVE_TODO;

  constructor(public payload: TodoListModel) {}
}

export type TodoListActionsType = AddTodo | RemoveTodo;
