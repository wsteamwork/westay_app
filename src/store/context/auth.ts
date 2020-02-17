import {createContext, Dispatch, Reducer} from 'react';
import {axios} from 'utils/api';
import {ProfileInfoRes} from 'types/Profile/ProfileResponse';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_LANGUAGE_STATUS = 'SET_LANGUAGE_STATUS';
export const SET_PROFILE = 'SET_PROFILE';
export const SET_FCM_TOKEN = 'SET_FCM_TOKEN';

export const AuthContext = createContext<IAuthGlobal | any>(null);

export interface IAuthGlobal {
  state: AuthState,
  dispatch: Dispatch<AuthAction>,
}

export type AuthState = {
  token: string | null,
  languageStatus: string,
  profile: ProfileInfoRes | null,
  fcmToken: string | null,
}

export type AuthAction =
  | { type: "SET_PROFILE"; payload: ProfileInfoRes | null}
  | { type: "SET_LANGUAGE_STATUS"; payload: string}
  | { type: "SET_FCM_TOKEN"; payload: any}
  | { type: 'SET_TOKEN' ; payload: any}

export const authInit:AuthState = {
  token: null,
  languageStatus: 'vi',
  profile: null,
  fcmToken: null,
};

export const authReducer: Reducer<AuthState, AuthAction> = (state:AuthState = authInit, action:AuthAction) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SET_LANGUAGE_STATUS:
      return { ...state, languageStatus: action.payload };
    case SET_PROFILE:
      return { ...state, profile: action.payload };
    case SET_FCM_TOKEN:
      return { ...state, fcmToken: action.payload };
    default:
      return state;
  }
};

export const setFcmToken = (payload:string) => ({ type: SET_FCM_TOKEN, payload });

export const getProfile = async (token:string, dispatch:Dispatch<AuthAction>, languageStatus:string) => {
  let res = await axios
    .get('profile?include=city,district', {
      headers: { Authorization: token, 'Accept-Language': languageStatus },
    })
    if(res) {
      dispatch({ type: 'SET_PROFILE', payload: res.data.data })
    }
    else {
      dispatch({ type: SET_PROFILE, payload: null })
    }
};
