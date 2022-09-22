import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from '../../../../store/app.reducer';
import * as AuthActions from '../../store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy, AfterViewInit {
  private storeSubscription: Subscription;
  error: string = null;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.storeSubscription = this.store
      .select('auth')
      .subscribe((authState) => {
        this.error = authState.authError;
      });
  }

  ngAfterViewInit(): void {}

  closeAlert(): void {
    this.store.dispatch(new AuthActions.ClearError());
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
}