import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-lists-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  listOpen: boolean = false;

  onClick() {
    this.listOpen = !this.listOpen;
  }

  checkClick() {
    return this.listOpen ? 'block' : 'none';
  }
}
