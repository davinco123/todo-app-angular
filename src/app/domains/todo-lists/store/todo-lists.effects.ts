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

  public getTodo$ = createEffect(() =>
    this.action$.pipe(
      ofType(TodoListActions.GET_TODO),
      switchMap(() =>
        this.http.get<TodoListsResponseData>(environment.postmanAPI + '/task')
      ),
      map((todoLists) => new TodoListActions.SetTodo(todoLists.data))
    )
  );

  public addTodo$ = createEffect(() =>
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
        map((todoList) => new TodoListActions.AddTodoCompleted(todoList.data))
      )
  );

  public deleteTodo$ = createEffect(() =>
    this.action$
      .pipe(
        ofType(TodoListActions.DELETE_TODO),
        switchMap((todoListData: TodoListActions.DeleteTodo) =>
          this.http.delete(
            environment.postmanAPI + '/task/' + todoListData.payload
          )
        )
      )
      .pipe(map((data) => new TodoListActions.GetTodo()))
  );

  public editTodo$ = createEffect(() =>
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
        map((todoList) => new TodoListActions.EditTodoCompleted(todoList.data))
      )
  );
}
