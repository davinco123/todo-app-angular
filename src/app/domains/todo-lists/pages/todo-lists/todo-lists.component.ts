import { Component } from '@angular/core';
import { TodoListStatus } from '../../models/todo-lists.model';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss'],
})
export class TodoListsComponent {
  public currentStatus: TodoListStatus = TodoListStatus.INPROGRESS;

  changeCurrentStatus(status: TodoListStatus): void {
    this.currentStatus = status;
  }
}
