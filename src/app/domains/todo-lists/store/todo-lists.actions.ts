import { Action } from '@ngrx/store';

import { TodoListModel } from '../models/todo-lists.model';

export const ADD_TODO = '[Todo List] Add Todo';
export const UPDATE_TODO = '[Todo List] Update Todo';
export const COMPLETE_TODO = '[Todo List] Complete Todo';
export const EDIT_TODO = '[Todo List] Edit Todo';

export class AddTodo implements Action {
  readonly type = ADD_TODO;

  constructor(public payload: TodoListModel) {}
}

export class UpdateTodo implements Action {
  readonly type = UPDATE_TODO;

  constructor(public payload: TodoListModel) {}
}

export class CompleteTodo implements Action {
  readonly type = COMPLETE_TODO;

  constructor(public payload: TodoListModel) {}
}

export class EditTodo implements Action {
  readonly type = EDIT_TODO;

  constructor(public payload: TodoListModel) {}
}

export type TodoListActionsType =
  | AddTodo
  | UpdateTodo
  | CompleteTodo
  | EditTodo;
