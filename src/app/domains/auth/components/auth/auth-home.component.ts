import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../store/app.reducer';

@Component({
  selector: 'app-auth-home',
  templateUrl: './auth-home.component.html',
  styleUrls: ['./auth-home.component.scss'],
})
export class AuthHomeComponent implements OnInit {
  public signInMode: boolean;
  public signUpMode: boolean;

  constructor(private store: Store<fromApp.AppState>) {
    this.signInMode = false;
    this.signUpMode = false;
  }

  toSignUp() {
    this.signUpMode = true;
    this.signInMode = false;
  }

  toSignIn() {
    this.signInMode = true;
    this.signUpMode = false;
  }

  ngOnInit(): void {}
}
