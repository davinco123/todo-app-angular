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
  public user = JSON.parse(localStorage.getItem('userData'));

  constructor(private action$: Actions, private http: HttpClient) {}

  getTodo$ = createEffect(() =>
    this.action$.pipe(
      ofType(TodoListActions.GET_TODO),
      switchMap(() => {
        return this.http.get<TodoListsResponseData>(
          environment.postmanAPI + '/task',
          {
            headers: { Authorization: 'Bearer ' + this.user._token },
          }
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
            },
            {
              headers: {
                Authorization: 'Bearer ' + this.user._token,
              },
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
            environment.postmanAPI + '/task/' + todoListData.payload,
            {
              headers: {
                Authorization: 'Bearer ' + this.user._token,
              },
            }
          );
        })
      )
      .pipe(
        map((data) => {
          return new TodoListActions.RefreshTodo();
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
            },
            {
              headers: {
                Authorization: 'Bearer ' + this.user._token,
              },
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
