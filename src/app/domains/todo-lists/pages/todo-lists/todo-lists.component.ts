import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.css'],
})
export class TodoListsComponent implements OnInit {
  currentMode = {
    inProgressMode: true,
    removedMode: false,
    completedMode: false,
  };

  constructor() {}

  ngOnInit(): void {}

  changeCurrentMode(mode: string) {
    if (mode === 'Completed') {
      this.currentMode.completedMode = true;
      this.currentMode.inProgressMode = false;
      this.currentMode.removedMode = false;
    } else if (mode === 'In Progress') {
      this.currentMode.completedMode = false;
      this.currentMode.inProgressMode = true;
      this.currentMode.removedMode = false;
    } else {
      this.currentMode.completedMode = false;
      this.currentMode.inProgressMode = false;
      this.currentMode.removedMode = true;
    }
  }
}
