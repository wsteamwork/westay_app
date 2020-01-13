import { createContext, Dispatch, Reducer } from 'react';
export const AuthContext = createContext({} as IAuthContext);

export interface IAuthContext {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}

export type AuthState = {
  readonly token: string | null;
  readonly languageStatus: string;
};

export type AuthAction =
  | { type: 'SET_TOKEN'; payload: string }
  | { type: 'SET_LANGUAGE_STATUS'; payload: string }

export const AuthStateInit: AuthState = {
  token: null,
  languageStatus: 'vi',
};

export const AuthReducer: Reducer<AuthState, AuthAction> = (
  state: AuthState,
  action: AuthAction
) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return  { ...state, token: action.payload }
    case 'SET_LANGUAGE_STATUS':
      return  { ...state, languageStatus: action.payload }
    default:
      return state;
  }
};

