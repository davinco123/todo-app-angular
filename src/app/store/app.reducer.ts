import * as fromTodoList from '../domains/todo-lists/store/todo-lists.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  todoList: fromTodoList.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  todoList: fromTodoList.todoListReducer,
};
