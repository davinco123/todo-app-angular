import { User } from '../model/user.model';

import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
}

const initialState: State = {
  user: null,
  authError: null,
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.SIGNIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
      };

    case AuthActions.AUTHENTICATION_SUCCESS:
      const user = new User(
        action.payload.user.name,
        action.payload.user.email,
        action.payload.user.age,
        action.payload.user.id,
        action.payload.user.createdAt,
        action.payload.user.updatedAt,
        action.payload.token
      );
      return {
        ...state,
        user: user,
      };

    case AuthActions.AUTHENTICATION_FAIL:
      return {
        ...state,
        authError: action.payload,
      };

    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };
    default:
      return state;
  }
}
