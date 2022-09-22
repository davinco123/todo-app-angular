import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, of, catchError } from 'rxjs';

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

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error has occured!!';
  if (!errorRes.error.error || !errorRes.error.message) {
    return of(new TodoListActions.ErrorTodo(errorMessage));
  }
  switch (errorRes.error.error) {
    case 'Please authenticate.':
      errorMessage = 'Unable to authenticate, please sign in again.';
      break;
  }
  return of(new TodoListActions.ErrorTodo(errorMessage));
};

@Injectable()
export class TodoListEffects {
  getTodo$ = createEffect(() =>
    this.action$.pipe(
      ofType(TodoListActions.GET_TODO),
      switchMap((todoListData: TodoListActions.GetTodo) => {
        return this.http.get<TodoListsResponseData>(
          'https://api-nodejs-todolist.herokuapp.com/task',
          {
            headers: { Authorization: 'Bearer ' + todoListData.payload },
          }
        );
      }),
      map((todoLists) => {
        const todoList = todoLists.data;
        return new TodoListActions.SetTodo(todoList);
      }),
      catchError((errorRes) => {
        return handleError(errorRes);
      })
    )
  );

  addTodo$ = createEffect(() =>
    this.action$
      .pipe(
        ofType(TodoListActions.ADD_TODO),
        switchMap((todoListData: TodoListActions.AddTodo) => {
          return this.http.post<TodoListResponseData>(
            'https://api-nodejs-todolist.herokuapp.com/task',
            {
              description: todoListData.payload.description,
            },
            {
              headers: {
                Authorization: 'Bearer ' + todoListData.payload.token,
              },
            }
          );
        })
      )
      .pipe(
        map((todoList) => {
          const todo = todoList.data;
          return new TodoListActions.AddTodoAfter(todo);
        }),
        catchError((errorRes) => {
          return handleError(errorRes);
        })
      )
  );

  deleteTodo$ = createEffect(() =>
    this.action$
      .pipe(
        ofType(TodoListActions.DELETE_TODO),
        switchMap((todoListData: TodoListActions.DeleteTodo) => {
          return this.http.delete(
            'https://api-nodejs-todolist.herokuapp.com/task/' +
              todoListData.payload.id,
            {
              headers: {
                Authorization: 'Bearer ' + todoListData.payload.token,
              },
            }
          );
        })
      )
      .pipe(
        map((data) => {
          return new TodoListActions.RefreshTodo();
        }),
        catchError((errorRes) => {
          return handleError(errorRes);
        })
      )
  );

  editTodo$ = createEffect(() =>
    this.action$
      .pipe(
        ofType(TodoListActions.EDIT_TODO),
        switchMap((todoListData: TodoListActions.EditTodo) => {
          return this.http.put<TodoListResponseData>(
            'https://api-nodejs-todolist.herokuapp.com/task/' +
              todoListData.payload.id,
            {
              description: todoListData.payload.description,
              completed: todoListData.payload.completed,
            },
            {
              headers: {
                Authorization: 'Bearer ' + todoListData.payload.token,
              },
            }
          );
        })
      )
      .pipe(
        map((todoList) => {
          const todo = todoList.data;
          return new TodoListActions.EditTodoAfter(todo);
        }),
        catchError((errorRes) => {
          return handleError(errorRes);
        })
      )
  );

  constructor(private action$: Actions, private http: HttpClient) {}
}
