import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  DoCheck,
} from '@angular/core';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { TodoListModel } from '../../models/todo-lists.model';
import * as fromApp from '../../../../store/app.reducer';

@Component({
  selector: 'app-todo-lists-item',
  templateUrl: './todo-lists-item.component.html',
  styleUrls: ['./todo-lists-item.component.css'],
})
export class TodoListsItemComponent implements OnInit, DoCheck {
  @Input() currentModeChange: {
    inProgressMode: boolean;
    removedMode: boolean;
    completedMode: boolean;
  };

  inProgressList: TodoListModel[] = [];
  removedList: TodoListModel[] = [];
  completedList: TodoListModel[] = [];
  inProgressMode: boolean = true;
  removedMode: boolean = false;
  completedMode: boolean = false;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store
      .select('todoList')
      .pipe(
        tap((todoListState) => {
          todoListState.todoList.filter((todoListItem) => {
            if (todoListItem.isInProgress)
              this.inProgressList.push(todoListItem);
            else if (todoListItem.isCompleted)
              this.completedList.push(todoListItem);
            else if (todoListItem.isRemoved)
              this.removedList.push(todoListItem);
          });
          return todoListState.todoList;
        })
      )
      .subscribe();
  }

  ngDoCheck(): void {
    this.completedMode = this.currentModeChange.completedMode;
    this.inProgressMode = this.currentModeChange.inProgressMode;
    this.removedMode = this.currentModeChange.removedMode;
  }
}
