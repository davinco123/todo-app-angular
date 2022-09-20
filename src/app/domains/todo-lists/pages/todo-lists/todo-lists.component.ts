import { Component, OnInit } from '@angular/core';
import { TodoListStatus } from '../../models/todo-lists.model';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss'],
})
export class TodoListsComponent implements OnInit {
  currentStatus: string;

  constructor() {
    this.currentStatus = TodoListStatus.INPROGRESS;
  }

  ngOnInit(): void {}

  changeCurrentStatus(status: string): void {
    this.currentStatus = status;
  }
}
