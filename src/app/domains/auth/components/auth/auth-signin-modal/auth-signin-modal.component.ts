import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from '../../../../../store/app.reducer';
import * as AuthActions from '../../../store/auth.actions';

@Component({
  selector: 'app-auth-signin-modal',
  templateUrl: './auth-signin-modal.component.html',
  styleUrls: ['./auth-signin-modal.component.scss'],
})
export class AuthSigninComponent implements OnInit, OnDestroy {
  private storeSubscription: Subscription;
  isLoading: boolean = false;
  signInForm: FormGroup;
  constructor(private store: Store<fromApp.AppState>) {
    this.signInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.email, Validators.required]),
    });
  }

  ngOnInit(): void {
    this.storeSubscription = this.store
      .select('auth')
      .subscribe((authState) => {
        this.isLoading = authState.loading;
      });
  }

  onSubmit() {
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    this.store.dispatch(
      new AuthActions.SigninStart({
        email: email,
        password: password,
      })
    );
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
}
