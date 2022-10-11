import { createAction, props } from '@ngrx/store';
import { TodoListModel } from '../models/todo-lists.model';

export const getTodo = createAction('[Todo List] Get Todo');

export const setTodo = createAction(
  '[Todo List] Set Todo',
  props<{ list: TodoListModel[] }>()
);

export const addTodo = createAction(
  '[Todo List] Add Todo',
  props<{ description: string }>()
);

export const addTodoCompleted = createAction(
  '[Todo List] Add Todo Completed',
  props<{ todo: TodoListModel }>()
);

export const deleteTodo = createAction(
  '[Todo List] Delete Todo',
  props<{ id: string }>()
);

export const editTodo = createAction(
  '[Todo List] Edit Todo',
  props<{ id: string; description: string; completed: boolean }>()
);

export const editTodoCompleted = createAction(
  '[Todo List] Edit Todo Completed',
  props<{ todo: TodoListModel }>()
);
