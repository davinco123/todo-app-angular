import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/domains/auth/model/user.model';

import * as fromApp from '../../../../store/app.reducer';
import * as AuthActions from '../../../auth/store/auth.actions';
import { TodoListStatus } from '../../models/todo-lists.model';

@Component({
  selector: 'app-todo-lists-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() statusChange = new EventEmitter<string>();
  private storeSubscription: Subscription;
  private userToken: string;
  today: number = new Date().getDate();
  month: string = new Date().toLocaleString('default', { month: 'long' });
  TodoEnum = TodoListStatus;
  isMenuOpen: boolean = false;
  currentStatus: string = TodoListStatus.INPROGRESS;

  ngOnInit(): void {
    this.storeSubscription = this.store
      .select('auth')
      .subscribe((authState) => {
        if (authState.user) {
          this.userToken = authState.user.token;
        }
      });
  }

  menuToggle(): void {
    this.isMenuOpen = true;
  }

  clickedOutside(): void {
    this.isMenuOpen = false;
  }

  onLogout(): void {
    this.store.dispatch(new AuthActions.Logout(this.userToken));
  }

  constructor(private store: Store<fromApp.AppState>) {}

  onStatusChange(value: TodoListStatus): void {
    this.currentStatus = value;
    this.statusChange.emit(value);
    this.isMenuOpen = false;
  }
}
