import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { TodoListModel } from '../../models/todo-lists.model';
import * as fromApp from '../../../../store/app.reducer';
import * as TodoListActions from '../../store/todo-lists.actions';

@Component({
  selector: 'app-todo-lists-item',
  templateUrl: './todo-lists-item.component.html',
  styleUrls: ['./todo-lists-item.component.scss'],
})
export class TodoListsItemComponent implements OnInit {
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
    this.currentModeChange = 'inprogress';
  }

  getCurrentList(): TodoListModel[] {
    return this.todoLists.filter((value) => {
      return value.mode === this.currentModeChange;
    });
  }

  onSubmit(): void {
    const newTodo = new TodoListModel(
      this.todoListForm.get('todo').value,
      'inprogress',
      this.todoLists.length
    );
    this.store.dispatch(new TodoListActions.AddTodo(newTodo));
    this.todoListForm.reset();
  }

  onUpdate(value: TodoListModel, inputvalue: string): void {
    if (value.todo !== inputvalue) {
      const newTodo = { ...value };
      newTodo.todo = inputvalue;
      return this.store.dispatch(new TodoListActions.UpdateTodo(newTodo));
    } else return this.store.dispatch(new TodoListActions.UpdateTodo(value));
  }

  onComplete(value: TodoListModel, inputvalue: string): void {
    if (value.todo !== inputvalue) {
      const newTodo = { ...value };
      newTodo.todo = inputvalue;
      return this.store.dispatch(new TodoListActions.UpdateTodo(newTodo));
    } else return this.store.dispatch(new TodoListActions.UpdateTodo(value));
  }
}
