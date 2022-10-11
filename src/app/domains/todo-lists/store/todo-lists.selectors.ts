import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { State } from './todo-lists.reducer';

export const selectTodo = (state: AppState) => state.todoList;

export const selectCompletedTodo = createSelector(selectTodo, (state: State) =>
  state.todoList.filter((todo) => todo.completed)
);

export const selectInprogressTodo = createSelector(selectTodo, (state: State) =>
  state.todoList.filter((todo) => !todo.completed)
);
