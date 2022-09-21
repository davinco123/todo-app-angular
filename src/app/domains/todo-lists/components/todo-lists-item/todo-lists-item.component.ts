import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { TodoListModel, TodoListStatus } from '../../models/todo-lists.model';
import * as fromApp from '../../../../store/app.reducer';
import * as TodoListActions from '../../store/todo-lists.actions';
import { User } from 'src/app/domains/auth/model/user.model';

@Component({
  selector: 'app-todo-lists-item',
  templateUrl: './todo-lists-item.component.html',
  styleUrls: ['./todo-lists-item.component.scss'],
})
export class TodoListsItemComponent implements OnInit, OnDestroy {
  @Input() currentStatusChange: string;
  private storeSubscription: Subscription;
  todoListForm: FormGroup;
  todoLists: TodoListModel[] = [];
  todoEnum = TodoListStatus;
  addMode: boolean = false;
  user: User;

  constructor(private store: Store<fromApp.AppState>) {
    this.currentStatusChange = TodoListStatus.INPROGRESS;
    this.todoListForm = new FormGroup({
      description: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.currentStatusChange = TodoListStatus.INPROGRESS;

    this.storeSubscription = this.store
      .select('auth')
      .subscribe((authState) => {
        if (authState.user) {
          this.user = authState.user;
          this.store.dispatch(new TodoListActions.GetTodo(this.user.token));
        }
      });

    this.store
      .select('todoList')
      .pipe(
        map((todoListState) => {
          return todoListState.todoList;
        })
      )
      .subscribe((todoList: TodoListModel[]) => {
        this.todoLists = todoList;
      });
  }

  getCurrentList(): TodoListModel[] {
    return this.todoLists.filter(
      (value) =>
        value.completed ===
        (this.currentStatusChange === TodoListStatus.COMPLETED ? true : false)
    );
  }

  onSubmit(): void {
    const description = this.todoListForm.get('description').value;
    const token = this.user.token;
    this.store.dispatch(new TodoListActions.AddTodo({ description, token }));
    this.todoListForm.reset();
    this.addMode = false;
  }

  onAddMode(): void {
    this.addMode = true;
  }

  onRemove(todoItem: TodoListModel): void {
    const token = this.user.token;
    const id = todoItem._id;
    this.store.dispatch(new TodoListActions.RemoveTodo(todoItem));
    this.store.dispatch(new TodoListActions.DeleteTodo({ id, token }));
  }

  onComplete(todoItem: TodoListModel, inputvalue: string): void {
    const id = todoItem._id;
    const token = this.user.token;
    const description = inputvalue;
    const completed = true;
    this.store.dispatch(
      new TodoListActions.EditTodo({ id, description, token, completed })
    );
  }

  onEdit(todoItem: TodoListModel, inputvalue: string): void {
    const id = todoItem._id;
    const token = this.user.token;
    const description = inputvalue;
    const completed = todoItem.completed;
    if (inputvalue == todoItem.description) {
      return null;
    } else {
      this.store.dispatch(
        new TodoListActions.EditTodo({ id, description, token, completed })
      );
    }
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
}
