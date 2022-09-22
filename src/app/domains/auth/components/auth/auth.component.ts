import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../store/app.reducer';
import * as AuthActions from '../../store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public signInMode: boolean;
  public signUpMode: boolean;
  signUpForm: FormGroup;
  signInForm: FormGroup;

  constructor(private store: Store<fromApp.AppState>) {
    this.signInMode = false;
    this.signUpMode = false;

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

    this.signInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.email, Validators.required]),
    });
  }

  toSignUp() {
    this.signUpMode = true;
    this.signInMode = false;
  }

  toSignIn() {
    this.signInMode = true;
    this.signUpMode = false;
  }

  onSubmit() {
    if (this.signUpMode && !this.signInMode) {
      const name = this.signUpForm.get('name').value;
      const email = this.signUpForm.get('email').value;
      const password = this.signUpForm.get('password').value;
      const age = this.signUpForm.get('age').value;
      this.store.dispatch(
        new AuthActions.SignupStart({
          name: name,
          email: email,
          password: password,
          age: age,
        })
      );
    } else if (this.signInMode && !this.signUpMode) {
      const email = this.signInForm.get('email').value;
      const password = this.signInForm.get('password').value;
      this.store.dispatch(
        new AuthActions.SigninStart({
          email: email,
          password: password,
        })
      );
    }
  }

  ngOnInit(): void {}
}
