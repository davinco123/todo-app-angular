import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { TodoListModel } from '../../models/todo-lists.model';
import * as fromApp from '../../../../store/app.reducer';
import * as TodoListActions from '../../store/todo-lists.actions';

@Component({
  selector: 'app-todo-lists-item',
  templateUrl: './todo-lists-item.component.html',
  styleUrls: ['./todo-lists-item.component.css'],
})
export class TodoListsItemComponent implements OnInit, DoCheck {
  @Input() currentModeChange: string;

  todoListForm: FormGroup;
  todoLists: TodoListModel[] = [];

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.todoListForm = new FormGroup({
      todo: new FormControl('', Validators.required),
    });

    this.store
      .select('todoList')
      .pipe(
        tap((todoListState) => {
          this.todoLists = todoListState.todoList;
        })
      )
      .subscribe();
  }

  getCurrentList(currentModeChange): TodoListModel[] {
    return this.todoLists.filter((value) => {
      return value.mode === currentModeChange;
    });
  }

  getCurrentMode(): string {
    return this.currentModeChange;
  }

  onSubmit() {
    const newTodo = new TodoListModel(this.todoListForm.get('todo').value);
    this.store.dispatch(new TodoListActions.AddTodo(newTodo));
    this.todoListForm.reset();
  }

  onRemove(value: TodoListModel) {
    this.store.dispatch(new TodoListActions.RemoveTodo(value));
  }

  ngDoCheck(): void {}
}
