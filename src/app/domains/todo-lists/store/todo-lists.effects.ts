import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, tap } from 'rxjs/operators';

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
        })
      )
  );

  constructor(private action$: Actions, private http: HttpClient) {}
}
