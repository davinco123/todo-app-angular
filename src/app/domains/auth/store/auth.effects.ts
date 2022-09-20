import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { User } from '../model/user.model';
import { of } from 'rxjs';

import * as AuthActions from './auth.actions';

export interface AuthResponseData {
  user: {
    age: number;
    _id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
  token: string;
}

const handleAuthentication = (
  user: {
    age: number;
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  },
  _token: string
) => {
  const newUser = new User(
    user.name,
    user.email,
    user.age,
    user.id,
    user.createdAt,
    user.updatedAt,
    _token
  );
  localStorage.setItem('userData', JSON.stringify(newUser));
  return new AuthActions.AuthenticationSuccess({
    user: {
      name: user.name,
      email: user.email,
      id: user.id,
      age: user.age,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
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
            'https://api-nodejs-todolist.herokuapp.com/user/register',
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
          return handleAuthentication(
            {
              age: resData.user.age,
              id: resData.user._id,
              name: resData.user.name,
              email: resData.user.email,
              createdAt: resData.user.createdAt,
              updatedAt: resData.user.updatedAt,
            },
            resData.token
          );
        }),
        catchError((errorRes) => {
          return handleError(errorRes);
        })
      )
  );

  signinStart$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthActions.SIGNIN_START),
      switchMap((authData: AuthActions.SigninStart) => {
        return this.http
          .post<AuthResponseData>(
            'https://api-nodejs-todolist.herokuapp.com/user/login',
            {
              email: authData.payload.email,
              password: authData.payload.password,
            }
          )
          .pipe(
            map((resData) => {
              return handleAuthentication(
                {
                  age: resData.user.age,
                  id: resData.user._id,
                  name: resData.user.name,
                  email: resData.user.email,
                  createdAt: resData.user.createdAt,
                  updatedAt: resData.user.updatedAt,
                },
                resData.token
              );
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
          name: string;
          email: string;
          age: number;
          id: string;
          createdAt: Date;
          updatedAt: Date;
          _token: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
          return { type: 'DUMMY MESSAGE' };
        }
        const loadedUser = new User(
          userData.name,
          userData.email,
          userData.age,
          userData.id,
          userData.createdAt,
          userData.updatedAt,
          userData._token
        );
        if (loadedUser.token) {
          return new AuthActions.AuthenticationSuccess({
            user: {
              name: loadedUser.name,
              email: loadedUser.email,
              id: loadedUser.id,
              age: loadedUser.age,
              createdAt: loadedUser.createdAt,
              updatedAt: loadedUser.updatedAt,
            },
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
        tap(() => {
          localStorage.removeItem('userData');
          console.log(localStorage.getItem('userData'));
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
