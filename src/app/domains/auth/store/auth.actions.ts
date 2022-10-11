import { createAction, props } from '@ngrx/store';
import { IUser } from '../model/user.model';

export const signupStart = createAction(
  '[Auth] Signup Start',
  props<{
    name: string;
    email: string;
    password: string;
    age: number;
  }>()
);

export const signinStart = createAction(
  '[Auth] Signin Start',
  props<{ email: string; password: string }>()
);

export const authenticationSuccess = createAction(
  '[Auth] Authentication Success',
  props<{ user: IUser; token: string; redirect: boolean }>()
);

export const authenticationFail = createAction(
  '[Auth] Authentication Fail',
  props<{ error: string }>()
);

export const autoSignin = createAction('[Auth] Auto Signin');

export const logout = createAction('[Auth] Logout');

export const clearError = createAction('[Auth] Clear Error');
