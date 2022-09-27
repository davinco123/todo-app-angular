import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import * as TodoListActions from './todo-lists.actions';
import { TodoListModel } from '../models/todo-lists.model';

export interface TodoListResponseData {
  success: string;
  data: TodoListModel;
}

export interface TodoListsResponseData {
  count: number;
  data: TodoListModel[];
}

@Injectable()
export class TodoListEffects {
  constructor(private action$: Actions, private http: HttpClient) {}

  getTodo$ = createEffect(() =>
    this.action$.pipe(
      ofType(TodoListActions.GET_TODO),
      switchMap(() => {
        return this.http.get<TodoListsResponseData>(
          environment.postmanAPI + '/task'
        );
      }),
      map((todoLists) => {
        return new TodoListActions.SetTodo(todoLists.data);
      })
    )
  );

  addTodo$ = createEffect(() =>
    this.action$
      .pipe(
        ofType(TodoListActions.ADD_TODO),
        switchMap((todoListData: TodoListActions.AddTodo) => {
          return this.http.post<TodoListResponseData>(
            environment.postmanAPI + '/task',
            {
              description: todoListData.payload,
            }
          );
        })
      )
      .pipe(
        map((todoList) => {
          return new TodoListActions.AddTodoCompleted(todoList.data);
        })
      )
  );

  deleteTodo$ = createEffect(() =>
    this.action$
      .pipe(
        ofType(TodoListActions.DELETE_TODO),
        switchMap((todoListData: TodoListActions.DeleteTodo) => {
          return this.http.delete(
            environment.postmanAPI + '/task/' + todoListData.payload
          );
        })
      )
      .pipe(
        map((data) => {
          return new TodoListActions.GetTodo();
        })
      )
  );

  editTodo$ = createEffect(() =>
    this.action$
      .pipe(
        ofType(TodoListActions.EDIT_TODO),
        switchMap((todoListData: TodoListActions.EditTodo) => {
          return this.http.put<TodoListResponseData>(
            environment.postmanAPI + '/task/' + todoListData.payload.id,
            {
              description: todoListData.payload.description,
              completed: todoListData.payload.completed,
            }
          );
        })
      )
      .pipe(
        map((todoList) => {
          const todo = todoList.data;
          return new TodoListActions.EditTodoCompleted(todo);
        })
      )
  );
}
