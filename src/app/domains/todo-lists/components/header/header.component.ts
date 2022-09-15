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
  isMenuOpen: boolean = false;
  currentMode: string = TodoListMode.INPROGRESS;

  ngOnInit(): void {}

  menuToggle(): void {
    this.isMenuOpen = true;
  }

  clickedOutside(): void {
    this.isMenuOpen = false;
  }

  public onModeChange(value: TodoListMode): void {
    this.currentMode = value;
    this.modeChange.emit(value);
    this.isMenuOpen = false;
  }
}
