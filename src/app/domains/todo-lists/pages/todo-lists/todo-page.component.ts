import { Component } from '@angular/core';
import { TodoListStatus } from '../../models/todo-lists.model';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
})
export class TodoPageComponent {
  public currentStatus: TodoListStatus = TodoListStatus.INPROGRESS;

  public changeCurrentStatus(status: TodoListStatus): void {
    this.currentStatus = status;
  }
}
