import { Component, Output, EventEmitter, OnInit } from '@angular/core';

export enum TodoListMode {
  INPROGRESS = 'inProgress',
  COMPLETED = 'completed',
  REMOVED = 'removed',
}

@Component({
  selector: 'app-todo-lists-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() modeChange = new EventEmitter<string>();
  today: number = new Date().getDate();
  month: string = new Date().toLocaleString('default', { month: 'long' });
  TodoEnum = TodoListMode;

  ngOnInit(): void {}

  public onModeChange(value: string): void {
    this.modeChange.emit(this.TodoEnum[value]);
  }
}
