import { User } from '../model/user.model';

import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
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
        loading: true,
      };

    case AuthActions.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        user: new User(action.payload.user, action.payload.token),
        loading: false,
      };

    case AuthActions.AUTHENTICATION_FAIL:
      return {
        ...state,
        authError: action.payload,
        loading: false,
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
