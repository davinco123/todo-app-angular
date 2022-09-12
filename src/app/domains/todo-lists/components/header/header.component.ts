import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-lists-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() modeChange = new EventEmitter<string>();

  toCompleted() {
    this.modeChange.emit('Completed');
  }

  toInProgress() {
    this.modeChange.emit('In Progress');
  }

  toRemoved() {
    this.modeChange.emit('Removed');
  }
}
