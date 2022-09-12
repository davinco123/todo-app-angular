import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { TodoListItem } from '../../models/todo-lists.model';
import * as fromApp from '../../../../store/app.reducer';

@Component({
  selector: 'app-todo-lists-item',
  templateUrl: './todo-lists-item.component.html',
  styleUrls: ['./todo-lists-item.component.css'],
})
export class TodoListsItemComponent implements OnInit {
  todoItemsInProgress: TodoListItem[] = [];
  todoItemsRemoved: TodoListItem[] = [];
  todoItemsCompleted: TodoListItem[] = [];
  inProgressMode: boolean = true;
  removedMode: boolean = false;
  completedMode: boolean = false;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store
      .select('todoList')
      .pipe(
        map((todoListState) => {
          console.log(todoListState);
          return todoListState.todoList;
        })
      )
      .subscribe((todoList) => {
        todoList.filter((todoItem) => {
          if (todoItem.isInProgress) this.todoItemsInProgress.push(todoItem);
          else if (todoItem.isCompleted) this.todoItemsCompleted.push(todoItem);
          else if (todoItem.isRemoved) this.todoItemsRemoved.push(todoItem);
        });
      });
  }
}
