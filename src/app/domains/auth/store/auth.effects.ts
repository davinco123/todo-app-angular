import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { IUser, User } from '../model/user.model';
import { of } from 'rxjs';

import { environment } from 'src/environments/environment';
import * as AuthActions from './auth.actions';

export interface AuthResponseData {
  user: IUser;
  token: string;
}

const handleAuthentication = (user: IUser, _token: string) => {
  const newUser = new User(user, _token);
  localStorage.setItem('userData', JSON.stringify(newUser));
  return new AuthActions.AuthenticationSuccess({
    user: user,
    token: _token,
    redirect: true,
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error has occured!!';
  if (!errorRes.error || !errorRes.message) {
    return of(new AuthActions.AuthenticationFail(errorMessage));
  }
  switch (errorRes.error) {
    case 'Unable to login':
      errorMessage = 'Email or password was incorrect.';
      break;
  }
  return of(new AuthActions.AuthenticationFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  signupStart$ = createEffect(() =>
    this.action$
      .pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupData: AuthActions.SignupStart) => {
          return this.http.post<AuthResponseData>(
            environment.postmanAPI + '/user/register',
            {
              name: signupData.payload.name,
              email: signupData.payload.email,
              password: signupData.payload.password,
              age: signupData.payload.age,
            }
          );
        })
      )
      .pipe(
        map((resData) => {
          return handleAuthentication(resData.user, resData.token);
        }),
        catchError((errorRes) => {
          return handleError(errorRes);
        })
      )
  );

  signinStart$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthActions.SIGNIN_START),
      switchMap((signinData: AuthActions.SigninStart) => {
        return this.http
          .post<AuthResponseData>(environment.postmanAPI + '/user/login', {
            email: signinData.payload.email,
            password: signinData.payload.password,
          })
          .pipe(
            map((resData) => {
              return handleAuthentication(resData.user, resData.token);
            }),
            catchError((errorRes) => {
              return handleError(errorRes);
            })
          );
      })
    )
  );

  authenticationSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.AUTHENTICATION_SUCCESS),
        tap((signupSuccessAction: AuthActions.AuthenticationSuccess) => {
          if (signupSuccessAction.payload.redirect) {
            this.router.navigate(['/todoLists']);
          }
        })
      ),
    { dispatch: false }
  );

  autoSignin$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthActions.AUTO_SIGNIN),
      map(() => {
        const userData: {
          user: IUser;
          _token: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
          return { type: 'DUMMY MESSAGE' };
        }
        const loadedUser = new User(userData.user, userData._token);
        if (loadedUser.token) {
          return new AuthActions.AuthenticationSuccess({
            user: loadedUser.user,
            token: loadedUser.token,
            redirect: false,
          });
        }
        return { type: 'DUMMY MESSAGE' };
      })
    )
  );

  logout$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.LOGOUT),
        switchMap(() => {
          return this.http.post(environment.postmanAPI + '/user/logout', {});
        }),
        tap(() => {
          localStorage.removeItem('userData');
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private action$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
