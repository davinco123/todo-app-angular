import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { TodoListMode } from '../../models/todo-lists.model';

@Component({
  selector: 'app-todo-lists-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() modeChange = new EventEmitter<string>();
  today: number = new Date().getDate();
  month: string = new Date().toLocaleString('default', { month: 'long' });
  TodoEnum = TodoListMode;

  ngOnInit(): void {}

  public onModeChange(value: TodoListMode): void {
    this.modeChange.emit(value);
  }
}
