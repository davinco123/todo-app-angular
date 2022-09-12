import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.css'],
})
export class TodoListsComponent implements OnInit {
  listMode = { inProgressMode: true, removedMode: false, completedMode: false };

  constructor() {}

  ngOnInit(): void {}

  changeListMode(mode: string) {
    if (mode === 'Completed') {
      this.listMode.completedMode = true;
      this.listMode.inProgressMode = false;
      this.listMode.removedMode = false;
    } else if (mode === 'In Progress') {
      this.listMode.completedMode = false;
      this.listMode.inProgressMode = true;
      this.listMode.removedMode = false;
    } else {
      this.listMode.completedMode = false;
      this.listMode.inProgressMode = false;
      this.listMode.removedMode = true;
    }
  }
}
