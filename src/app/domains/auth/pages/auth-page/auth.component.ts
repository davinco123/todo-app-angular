import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from '../../../../store/app.reducer';
import { clearError } from '../../store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  public error = '';
  private storeSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  public ngOnInit(): void {
    this.storeSubscription = this.store
      .select('auth')
      .subscribe((authState) => {
        this.error = authState.authError;
      });
  }

  public closeAlert(): void {
    this.store.dispatch(clearError());
  }

  public ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
}
