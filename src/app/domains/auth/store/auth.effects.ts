import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { AuthResponseData, IUser, User } from '../model/user.model';
import { of } from 'rxjs';

import { environment } from 'src/environments/environment';
import * as AuthActions from './auth.actions';

const handleAuthentication = (user: IUser, _token: string) => {
  localStorage.setItem('userData', JSON.stringify(new User(user, _token)));

  return AuthActions.authenticationSuccess({
    user: user,
    token: _token,
    redirect: true,
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error has occured!!';
  if (!errorRes.error || !errorRes.message) {
    return of(AuthActions.authenticationFail({ error: errorMessage }));
  }
  switch (errorRes.error) {
    case 'Unable to login':
      errorMessage = 'Email or password was incorrect.';
      break;
  }
  return of(AuthActions.authenticationFail({ error: errorMessage }));
};

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}

  public signupStart$ = createEffect(() =>
    this.action$
      .pipe(
        ofType(AuthActions.signupStart),
        switchMap((action) => {
          return this.http.post<AuthResponseData>(
            environment.postmanAPI + '/user/register',
            {
              name: action.name,
              email: action.email,
              password: action.password,
              age: action.age,
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

  public signinStart$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthActions.signinStart),
      switchMap((action) => {
        return this.http
          .post<AuthResponseData>(environment.postmanAPI + '/user/login', {
            email: action.email,
            password: action.password,
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

  public authenticationSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.authenticationSuccess),
        tap((action) => {
          if (action.redirect) {
            this.router.navigate(['/todoLists']);
          }
        })
      ),
    { dispatch: false }
  );

  public autoSignin$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthActions.autoSignin),
      map(() => {
        const userData: {
          user: IUser;
          _token: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
          return { type: 'DUMMY MESSAGE' };
        }

        if (userData._token) {
          return AuthActions.authenticationSuccess({
            user: userData.user,
            token: userData._token,
            redirect: false,
          });
        }
        return { type: 'DUMMY MESSAGE' };
      })
    )
  );

  public logout$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('userData');
          this.router.navigate(['auth']);
        })
      ),
    { dispatch: false }
  );
}
