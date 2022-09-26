import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs';
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
  public todoLists: TodoListModel[] = [];
  public todoEnum = TodoListStatus;
  private addMode = false;
  private todoListForm: FormGroup;

  constructor(private store: Store<fromApp.AppState>) {
    this.currentStatusChange = TodoListStatus.INPROGRESS;
    this.todoListForm = new FormGroup({
      description: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.currentStatusChange = TodoListStatus.INPROGRESS;

    this.store.dispatch(new TodoListActions.GetTodo());

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

  onAddMode(): void {
    this.addMode = true;
  }
  onSubmit(): void {
    this.store.dispatch(
      new TodoListActions.AddTodo(this.todoListForm.get('description').value)
    );
    this.todoListForm.reset();
    this.addMode = false;
  }

  onRemove(todoItem: TodoListModel): void {
    this.store.dispatch(new TodoListActions.RemoveTodo(todoItem));
    this.store.dispatch(new TodoListActions.DeleteTodo(todoItem._id));
  }

  onEdit(todoItem: TodoListModel, inputvalue: string, isEdit: boolean): void {
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
