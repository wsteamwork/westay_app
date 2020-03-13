import {Dispatch, Reducer} from 'redux';
import {updateObject} from 'utils/mixins';
import {AxiosRes} from 'types/ResponseTemplate';
import {axios_merchant} from 'utils/api';

export type DetailsReducerState = {
  room_id: number | null;
  step: string;
  disable_next: boolean;
  listing: any;
  error: boolean;
};

export const init: DetailsReducerState = {
  room_id: null,
  step: '',
  disable_next: false,
  listing: null,
  error: false,
};

export type DetailsReducerAction =
  | { type: 'setRoomId'; payload: number }
  | { type: 'setStep'; payload: string }
  | { type: 'setDisableNext'; payload: boolean }
  | { type: 'setListing'; payload: any }
  | { type: 'setError'; payload: boolean };

export const detailsReducer: Reducer<DetailsReducerState, DetailsReducerAction> = (
  state: DetailsReducerState = init,
  action: DetailsReducerAction,
): DetailsReducerState => {
  switch (action.type) {
    case 'setRoomId':
      return updateObject(state, {room_id: action.payload});
    case 'setStep':
      return updateObject(state, {step: action.payload});
    case 'setDisableNext':
      return updateObject(state, {disable_next: action.payload});
    case 'setListing':
      return updateObject(state, {listing: action.payload});
    case 'setError':
      return updateObject(state, {error: action.payload});
    default:
      return state;
  }
};

export const getListingDetails = async (
  id: any,
  dispatch: Dispatch<DetailsReducerAction>,
): Promise<any> => {
  try {
    const res: AxiosRes<any> = await axios_merchant.get(`long-term-rooms/${id}`);
    const listing            = res.data.data;
    const room_id            = listing.room_id;
    if (listing) {
      dispatch({type: 'setRoomId', payload: room_id});
      dispatch({type: 'setListing', payload: listing});
    }
    return listing;
  } catch (error) {
    dispatch({type: 'setError', payload: true});
  }
};

export const handleDetailsListing = async (room_id: number, tab: string, data: any, token: string) => {
  const response = await axios_merchant.post(
    `long-term/room/step2/${tab}/${room_id}`,
    {
      step2: {
        [`${tab}`]: data,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
