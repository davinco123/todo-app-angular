import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import * as fromApp from '../../../../store/app.reducer';
import * as AuthActions from '../../store/auth.actions';

@Component({
  selector: 'app-auth-signup-modal',
  templateUrl: './auth-signup-modal.component.html',
  styleUrls: ['./auth-signup-modal.component.scss'],
})
export class AuthSignupComponent implements OnDestroy, OnInit {
  public isLoading: boolean = false;
  private storeSubscription: Subscription;
  private signUpForm: FormGroup;

  constructor(private store: Store<fromApp.AppState>) {
    this.signUpForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      age: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]\d*$/),
      ]),
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
    this.store.dispatch(
      new AuthActions.SignupStart({
        name: this.signUpForm.get('name').value,
        email: this.signUpForm.get('email').value,
        password: this.signUpForm.get('password').value,
        age: this.signUpForm.get('age').value,
      })
    );
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
}
