import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { TodoListModel, TodoListStatus } from '../../models/todo-lists.model';
import * as fromApp from '../../../../store/app.reducer';
import * as TodoListActions from '../../store/todo-lists.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input() public currentStatusChange: string;
  public todoLists$: Observable<TodoListModel[]>;
  public todoEnum = TodoListStatus;
  private addMode = false;
  private todoListForm: FormGroup;

  constructor(private store: Store<fromApp.AppState>) {}

  public ngOnInit(): void {
    this.todoListForm = new FormGroup({
      description: new FormControl('', Validators.required),
    });

    this.currentStatusChange = TodoListStatus.INPROGRESS;

    this.store.dispatch(new TodoListActions.GetTodo());

    this.todoLists$ = this.store
      .select('todoList')
      .pipe(map((state) => state.todoList));
  }

  public onAddMode(): void {
    this.addMode = true;
  }

  public onSubmit(): void {
    this.store.dispatch(
      new TodoListActions.AddTodo(this.todoListForm.get('description').value)
    );
    this.todoListForm.reset();
    this.addMode = false;
  }

  public onRemove(todoItem: TodoListModel): void {
    this.store.dispatch(new TodoListActions.DeleteTodo(todoItem._id));
  }

  public onEdit(
    todoItem: TodoListModel,
    inputvalue: string,
    isEdit: boolean
  ): void {
    if (isEdit && inputvalue === todoItem.description) {
      return;
    }

    this.store.dispatch(
      new TodoListActions.EditTodo({
        id: todoItem._id,
        description: inputvalue,
        completed: isEdit ? todoItem.completed : true,
      })
    );
  }
}
