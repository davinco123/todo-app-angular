import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { TodoListModel, TodoListStatus } from '../../models/todo-lists.model';
import * as fromApp from '../../../../store/app.reducer';
import * as TodoListActions from '../../store/todo-lists.actions';

@Component({
  selector: 'app-todo-lists-item',
  templateUrl: './todo-lists-item.component.html',
  styleUrls: ['./todo-lists-item.component.scss'],
})
export class TodoListsItemComponent implements OnInit, OnDestroy {
  @Input() currentStatusChange: string;
  todoListForm: FormGroup;
  todoLists: TodoListModel[] = [];
  todoEnum = TodoListStatus;
  addMode: boolean = false;

  constructor(private store: Store<fromApp.AppState>) {
    this.currentStatusChange = TodoListStatus.INPROGRESS;
    this.todoListForm = new FormGroup({
      todo: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.store
      .select('todoList')
      .pipe(
        tap((todoListState) => {
          this.todoLists = todoListState.todoList;
        })
      )
      .subscribe();
    this.currentStatusChange = TodoListStatus.INPROGRESS;
  }

  getCurrentList(): TodoListModel[] {
    return this.todoLists.filter(
      (value) => value.status === this.currentStatusChange
    );
  }

  onSubmit(): void {
    if (this.todoListForm.get('todo')?.value) {
      const newTodo = new TodoListModel(
        this.todoListForm.get('todo')?.value,
        TodoListStatus.INPROGRESS,
        this.todoLists.length
      );
      this.store.dispatch(new TodoListActions.AddTodo(newTodo));
      this.addMode = false;
    }

    this.todoListForm.reset();
  }

  onAddMode(): void {
    this.addMode = true;
  }

  onUpdate(value: TodoListModel, inputvalue?: string): void {
    if (inputvalue !== undefined && value.todo !== inputvalue) {
      const newTodo = { ...value };
      newTodo.todo = inputvalue;
      this.store.dispatch(new TodoListActions.UpdateTodo(newTodo));
    } else this.store.dispatch(new TodoListActions.UpdateTodo(value));
  }

  onComplete(value: TodoListModel, inputvalue: string): void {
    if (value.todo !== inputvalue) {
      const newTodo = { ...value };
      newTodo.todo = inputvalue;
      this.store.dispatch(new TodoListActions.CompleteTodo(newTodo));
    } else this.store.dispatch(new TodoListActions.CompleteTodo(value));
  }

  onEdit(value: TodoListModel, inputvalue: string): void {
    if (value.todo === inputvalue) return;
    else if (value.todo !== inputvalue) {
      const newTodo = { ...value };
      newTodo.todo = inputvalue;
      this.store.dispatch(new TodoListActions.EditTodo(newTodo));
    }
  }

  ngOnDestroy(): void {}
}
