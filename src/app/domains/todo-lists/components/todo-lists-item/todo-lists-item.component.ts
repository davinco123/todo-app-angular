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
  todoItems: TodoListItem[];

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store
      .select('todoList')
      .pipe(
        map((todoListState) => {
          return todoListState.todoList;
        })
      )
      .subscribe((todoList) => (this.todoItems = todoList));
    console.log(this.todoItems);
  }
}
