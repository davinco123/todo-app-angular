import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss'],
})
export class TodoListsComponent implements OnInit {
  currentMode: string;

  constructor() {}

  ngOnInit(): void {}

  changeCurrentMode(mode: string) {
    this.currentMode = mode;
  }
}
