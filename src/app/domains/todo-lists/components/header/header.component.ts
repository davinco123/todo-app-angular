import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-lists-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() modeChange = new EventEmitter<string>();
  today: number = new Date().getDate();
  month: string = new Date().toLocaleString('default', { month: 'long' });

  ngOnInit(): void {}

  toCompletedMode() {
    this.modeChange.emit('Completed');
  }

  toInProgressMode() {
    this.modeChange.emit('In Progress');
  }

  toRemovedMode() {
    this.modeChange.emit('Removed');
  }
}
