import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as AuthActions from '../../../auth/store/auth.actions';
import { TodoListStatus } from '../../models/todo-lists.model';

@Component({
  selector: 'app-todo-lists-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() statusChange = new EventEmitter<string>();
  public date = new Date();
  public isMenuOpen = false;
  public TodoEnum = TodoListStatus;
  public currentStatus: TodoListStatus = TodoListStatus.INPROGRESS;

  constructor(private store: Store<fromApp.AppState>) {}

  menuToggle(): void {
    this.isMenuOpen = true;
  }

  clickedOutside(): void {
    this.isMenuOpen = false;
  }

  onLogout(): void {
    this.store.dispatch(new AuthActions.Logout());
  }

  onStatusChange(value: TodoListStatus): void {
    this.currentStatus = value;
    this.statusChange.emit(value);
    this.isMenuOpen = false;
  }
}
