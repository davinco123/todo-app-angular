import { Action } from '@ngrx/store';

export const SIGNUP_START = '[Auth] Signup Start';
export const SIGNIN_START = '[Auth] Signin Start';
export const AUTHENTICATION_SUCCESS = '[Auth] Authentication Success';
export const AUTHENTICATION_FAIL = '[Auth] Authentication Fail';
export const AUTO_SIGNIN = '[Auth] Auto Signin';
export const LOGOUT = '[Auth] Logout';

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(
    public payload: {
      name: string;
      email: string;
      password: string;
      age: number;
    }
  ) {}
}

export class SigninStart implements Action {
  readonly type = SIGNIN_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticationSuccess implements Action {
  readonly type = AUTHENTICATION_SUCCESS;

  constructor(
    public payload: {
      user: {
        name: string;
        email: string;
        id: string;
        age: number;
        createdAt: Date;
        updatedAt: Date;
      };
      token: string;
      redirect: boolean;
    }
  ) {}
}

export class AuthenticationFail implements Action {
  readonly type = AUTHENTICATION_FAIL;

  constructor(public payload: string) {}
}

export class AutoSignin implements Action {
  readonly type = AUTO_SIGNIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type AuthActions =
  | SignupStart
  | SigninStart
  | AuthenticationSuccess
  | AuthenticationFail
  | AutoSignin
  | Logout;
