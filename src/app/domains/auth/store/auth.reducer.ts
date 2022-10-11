import { createReducer, Action, on } from '@ngrx/store';
import { User } from '../model/user.model';

import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

export const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.signupStart, AuthActions.signinStart, (state) => ({
    ...state,
    loading: true,
  })),

  on(AuthActions.authenticationSuccess, (state, payload) => ({
    ...state,
    user: new User(payload.user, payload.token),
    loading: false,
  })),

  on(AuthActions.authenticationFail, (state, payload) => ({
    ...state,
    authError: payload.error,
    loading: false,
  })),

  on(AuthActions.logout, (state) => ({ ...state, user: null })),

  on(AuthActions.clearError, (state) => ({ ...state, error: null }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
