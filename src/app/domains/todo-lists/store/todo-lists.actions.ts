import { Action } from '@ngrx/store';

import { TodoListModel } from '../models/todo-lists.model';

export const GET_TODO = '[Todo List] Get Todo';
export const SET_TODO = '[Todo List] Set Todo';
export const ADD_TODO = '[Todo List] Add Todo';
export const ADD_TODO_COMPLETED = '[Todo List] Add Todo Completed';
export const DELETE_TODO = '[Todo List] Delete Todo';
export const EDIT_TODO = '[Todo List] Edit Todo';
export const EDIT_TODO_COMPLETED = '[Todo List] Edit Todo Completed';

export class GetTodo implements Action {
  readonly type = GET_TODO;
}

export class SetTodo implements Action {
  readonly type = SET_TODO;

  constructor(public payload: TodoListModel[]) {}
}

export class AddTodo implements Action {
  readonly type = ADD_TODO;

  constructor(public payload: string) {}
}

export class AddTodoCompleted implements Action {
  readonly type = ADD_TODO_COMPLETED;

  constructor(public payload: TodoListModel) {}
}

export class DeleteTodo implements Action {
  readonly type = DELETE_TODO;

  constructor(public payload: string) {}
}

export class EditTodo implements Action {
  readonly type = EDIT_TODO;

  constructor(
    public payload: {
      id: string;
      description: string;
      completed: boolean;
    }
  ) {}
}

export class EditTodoCompleted implements Action {
  readonly type = EDIT_TODO_COMPLETED;

  constructor(public payload: TodoListModel) {}
}

export type TodoListActionsType =
  | AddTodoCompleted
  | GetTodo
  | SetTodo
  | AddTodo
  | DeleteTodo
  | EditTodo
  | EditTodoCompleted;
