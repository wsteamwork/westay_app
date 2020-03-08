import { Reducer, Dispatch } from 'redux';
import {ProfileViewInfoRes} from 'types/Profile/ProfileResponse';
import {RoomIndexRes} from 'types/Rooms/RoomResponses';
import {updateObject} from 'utils/mixins';
import {axios} from 'utils/api';
import {AxiosRes} from 'types/ResponseTemplate';
import {ReducersActions} from 'store/redux/reducers/index';

export type UserProfileActions =
  | { type: 'SET_PROFILE_USER'; payload: ProfileViewInfoRes }
  | { type: 'SET_ROOMS_USER'; payload: RoomIndexRes[] }
  | { type: 'SET_ERROR_USER_PROFILE'; payload: boolean };

export type UserProfileState = {
  readonly profile: ProfileViewInfoRes | null;
  readonly userRooms: RoomIndexRes[];
  readonly error: boolean;
};

export const init: UserProfileState = {
  profile: null,
  userRooms: [],
  error: false
};

export const userProfileReducer: Reducer<UserProfileState, UserProfileActions> = (
  state: UserProfileState = init,
  action: UserProfileActions
): UserProfileState => {
  switch (action.type) {
    case 'SET_PROFILE_USER':
      return updateObject(state, { profile: action.payload });
    case 'SET_ROOMS_USER':
      return updateObject(state, { userRooms: action.payload });
    case 'SET_ERROR_USER_PROFILE':
      return updateObject(state, { error: action.payload });
    default:
      return state;
  }
};

export const getProfileById = async (
  idUser: any,
  initLanguage: string =  'en'
): Promise<ProfileViewInfoRes> => {
  const res: AxiosRes<ProfileViewInfoRes> = await axios.get(`/profile/${idUser}`, {
    headers: { 'Accept-Language': initLanguage }
  });
  return res.data.data;
};

export const getRoomMerchantById = async (
  idUser: any,
  initLanguage: string =  'en'
): Promise<RoomIndexRes[]> => {
  const res: AxiosRes<RoomIndexRes[]> = await axios.get(
    `rooms?merchant=${idUser}&include=reviews.user,details,media,city,district&limit=30`,
    { headers: { 'Accept-Language': initLanguage } }
  );
  return res.data.data;
};

export const getDataViewProfile = async (
  id: any,
  dispatch: Dispatch<UserProfileActions>,
  initLanguage: string =  'en'
): Promise<Omit<UserProfileState, 'error'> | undefined> => {
  try {
    const res = await Promise.all([
      getProfileById(id, initLanguage),
      getRoomMerchantById(id, initLanguage)
    ]);
    const [profile, userRooms] = res;
    dispatch({ type: 'SET_PROFILE_USER', payload: profile });
    dispatch({ type: 'SET_ROOMS_USER', payload: userRooms });
    dispatch({ type: 'SET_ERROR_USER_PROFILE', payload: false });
    return { profile, userRooms };
  } catch (error) {
    dispatch({ type: 'SET_ERROR_USER_PROFILE', payload: true });
  }
};
