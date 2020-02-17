import { LTBookingPriceCalculatorRes } from './../../../../types/Booking/BookingResponses';
import { LTBookingReq } from './../../../../types/Booking/BookingRequests';
import { DEFAULT_DATE_FORMAT } from './../../../../types/globalTypes';
import { axios } from 'utils/api';
import { updateObject } from 'utils/mixins';
import { Dispatch, Reducer } from 'redux';
import { LTRoomIndexRes } from 'types/LTR/LTRoom/LTRoom';
import { AxiosRes } from 'types/ResponseTemplate';
import moment from 'moment';
import { LTRoomAvailableRes } from 'types/Rooms/RoomResponses';

export type LTRoomReducerState = {
  readonly room: LTRoomIndexRes | null;
  readonly roomId: number | null;
  readonly roomAvailable: string[] | null;
  readonly error: boolean;
};

export type LTRoomReducerAction =
  | { type: 'setLTRoom'; payload: LTRoomIndexRes }
  | { type: 'setRoomId'; payload: number }
  | { type: 'setMovein'; payload: string }
  | { type: 'setMoveout'; payload: string }
  | { type: 'setRoomAvailable'; payload: string[] }
  | { type: 'setErrorSSRLTRoompage'; payload: boolean };

export const init: LTRoomReducerState = {
  room: null,
  roomId: null,
  roomAvailable: null,
  error: false,
};

export const ltroomReducer: Reducer<LTRoomReducerState, LTRoomReducerAction> = (
  state: LTRoomReducerState = init,
  action: LTRoomReducerAction,
): LTRoomReducerState => {
  switch (action.type) {
    case 'setLTRoom':
      return updateObject(state, { room: action.payload });
    case 'setRoomId':
      return updateObject(state, { roomId: action.payload });
    case 'setRoomAvailable':
      return updateObject(state, { roomAvailable: action.payload });
    case 'setErrorSSRLTRoompage':
      return updateObject(state, { error: action.payload });
    default:
      return state;
  }
};

export const getLTRoom = async (idRoom: number, initLanguage: string = 'en'): Promise<any> => {
  const res: AxiosRes<LTRoomIndexRes> = await axios.get(
    `long-term-rooms/${idRoom}?include=city,district,merchant`,
    { headers: { 'Accept-Language': initLanguage } },
  );
  return res;
};

export const getDataLTRoom = async (
  id: number,
  dispatch: Dispatch<LTRoomReducerAction>,
  initLanguage: string = 'en',
): Promise<any> => {
  try {
    const res: AxiosRes<LTRoomIndexRes> = await getLTRoom(id, initLanguage);
    const room = res.data.data;
    dispatch({ type: 'setLTRoom', payload: room });
    dispatch({ type: 'setRoomId', payload: room.id });
    return { room };
  } catch (error) {
    dispatch({ type: 'setErrorSSRLTRoompage', payload: true });
  }
};

export const getRoomAvailableDate = async (
  idRoom: any,
  initLanguage: string = 'en',
  date_start: string = moment().format(DEFAULT_DATE_FORMAT),
): Promise<LTRoomAvailableRes> => {
  const res: AxiosRes<LTRoomAvailableRes> = await axios.get(
    `long-term-rooms/available-dates/${idRoom}?option=mobile`,
    {
      params: {
        move_in: date_start,
      },
      headers: { 'Accept-Language': initLanguage },
    },
  );
  return res.data.data;
};
