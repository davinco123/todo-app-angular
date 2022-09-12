import { Action } from '@ngrx/store';

import { TodoListModel } from '../models/todo-lists.model';

export const ADD_TODO = '[Todo List] Add Todo';

export class AddTodo implements Action {
  readonly type = ADD_TODO;

  constructor(public payload: TodoListModel) {}
}

export type TodoListActionsType = AddTodo;
