import { Component, OnInit } from '@angular/core';

import * as fromApp from './store/app.reducer';
import { Store } from '@ngrx/store';
import { autoSignin } from './domains/auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(autoSignin());
  }
}
