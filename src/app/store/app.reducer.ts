import * as fromTodoList from '../domains/todo-lists/store/todo-lists.reducer';
import * as fromAuth from '../domains/auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  todoList: fromTodoList.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  todoList: fromTodoList.todoReducer,
  auth: fromAuth.authReducer,
};
