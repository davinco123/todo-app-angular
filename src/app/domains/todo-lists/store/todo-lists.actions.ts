import { Action } from '@ngrx/store';

import { TodoListModel } from '../models/todo-lists.model';

export const GET_TODO = '[Todo List] Get Todo';
export const SET_TODO = '[Todo List] Set Todo';
export const ADD_TODO = '[Todo List] Add Todo';
export const ADD_TODO_AFTER = '[Todo List] Add Todo After';
export const DELETE_TODO = '[Todo List] Delete Todo';
export const REMOVE_TODO = '[Todo List] Remove Todo';
export const EDIT_TODO = '[Todo List] Edit Todo';
export const EDIT_TODO_AFTER = '[Todo List] Edit Todo After';
export const REFRESH_TODO = '[Todo List] Refresh Todo';
export const ERROR_TODO = '[Todo List] Todo Error';

export class GetTodo implements Action {
  readonly type = GET_TODO;

  constructor(public payload: string) {}
}

export class SetTodo implements Action {
  readonly type = SET_TODO;

  constructor(public payload: TodoListModel[]) {}
}

export class AddTodo implements Action {
  readonly type = ADD_TODO;

  constructor(public payload: { description: string; token: string }) {}
}

export class AddTodoAfter implements Action {
  readonly type = ADD_TODO_AFTER;

  constructor(public payload: TodoListModel) {}
}

export class DeleteTodo implements Action {
  readonly type = DELETE_TODO;

  constructor(public payload: { id: string; token: string }) {}
}

export class RemoveTodo implements Action {
  readonly type = REMOVE_TODO;

  constructor(public payload: TodoListModel) {}
}

export class EditTodo implements Action {
  readonly type = EDIT_TODO;

  constructor(
    public payload: {
      id: string;
      description: string;
      token: string;
      completed: boolean;
    }
  ) {}
}

export class EditTodoAfter implements Action {
  readonly type = EDIT_TODO_AFTER;

  constructor(public payload: TodoListModel) {}
}

export class RefreshTodo implements Action {
  readonly type = REFRESH_TODO;
}

export class ErrorTodo implements Action {
  readonly type = ERROR_TODO;

  constructor(public payload: string) {}
}

export type TodoListActionsType =
  | AddTodoAfter
  | GetTodo
  | SetTodo
  | AddTodo
  | DeleteTodo
  | EditTodo
  | EditTodoAfter
  | RefreshTodo
  | RemoveTodo
  | ErrorTodo;
