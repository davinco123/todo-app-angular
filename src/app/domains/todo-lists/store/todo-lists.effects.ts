import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import * as TodoListActions from './todo-lists.actions';
import {
  TodoItemArrayResponseData,
  TodoItemResponseData,
} from '../models/todo-lists.model';

@Injectable()
export class TodoListEffects {
  constructor(private action$: Actions, private http: HttpClient) {}

  public getTodo$ = createEffect(() =>
    this.action$.pipe(
      ofType(TodoListActions.getTodo),
      switchMap(() =>
        this.http.get<TodoItemArrayResponseData>(
          environment.postmanAPI + '/task'
        )
      ),
      map((todoLists) => TodoListActions.setTodo({ list: todoLists.data }))
    )
  );

  public addTodo$ = createEffect(() =>
    this.action$
      .pipe(
        ofType(TodoListActions.addTodo),
        switchMap((action) => {
          return this.http.post<TodoItemResponseData>(
            environment.postmanAPI + '/task',
            {
              description: action.description,
            }
          );
        })
      )
      .pipe(
        map((todoList) =>
          TodoListActions.addTodoCompleted({ todo: todoList.data })
        )
      )
  );

  public deleteTodo$ = createEffect(() =>
    this.action$
      .pipe(
        ofType(TodoListActions.deleteTodo),
        switchMap((action) =>
          this.http.delete(environment.postmanAPI + '/task/' + action.id)
        )
      )
      .pipe(map((data) => TodoListActions.getTodo()))
  );

  public editTodo$ = createEffect(() =>
    this.action$
      .pipe(
        ofType(TodoListActions.editTodo),
        switchMap((action) => {
          return this.http.put<TodoItemResponseData>(
            environment.postmanAPI + '/task/' + action.id,
            {
              description: action.description,
              completed: action.completed,
            }
          );
        })
      )
      .pipe(
        map((todoList) =>
          TodoListActions.editTodoCompleted({ todo: todoList.data })
        )
      )
  );
}
