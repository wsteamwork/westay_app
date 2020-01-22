import qs from 'query-string';
import {createContext, Dispatch} from 'react';
import {axios} from 'utils/api';
import {RoomIndexRes} from 'types/Rooms/RoomResponses';
import {PriceByDayRes, BodyRequestPriceByDayRes} from 'types/Rooms/PriceByDay';
import {Reducer} from 'redux';
import {updateObject} from 'utils/mixins';
import moment from 'moment';
import {DEFAULT_DATE_FORMAT} from 'types/globalTypes';
import {AxiosRes} from 'types/ResponseTemplate';

export interface DataChangePriceByDay {
  [key: string]: PriceByDayRes;
}

export const changeDataPriceByDay = (data: PriceByDayRes[]): DataChangePriceByDay => {
  return data.reduce((a:any, b:PriceByDayRes) => {
    if (!a[b.date]) {
      a[b.date] = b;
    }
    return a;
  }, {});
};

export const RoomDetailContext = createContext<IRoomDetailContext| any>(null);

export const fetchRoom = async (url:string, languageStatus:string) => {
  const res = await axios.get(url, {
    headers: { 'Accept-Language': languageStatus },
  });
  return res.data.data;
};

export interface IRoomDetailContext {
  state: RoomDetailsState,
  dispatch: Dispatch<RoomReducerAction>,
}

export type RoomDetailsState = {
  readonly room: RoomIndexRes | null;
  readonly roomRecommend: RoomIndexRes[];
  readonly roomSchedule: string[] | null;
  readonly priceByDay: PriceByDayRes[];
  readonly error: boolean;
};

export type RoomReducerAction =
  | { type: 'setRoomData', room: RoomIndexRes, roomRecommend: RoomIndexRes[], roomSchedule: string[] }
  | { type: 'setRoomSchedule', payload: string[] }
  | { type: 'setPriceByDay'; payload: PriceByDayRes[] }
  | { type: 'addPriceByDay'; payload: PriceByDayRes[] }
  | { type: 'setErrorSSRRoomPage'; payload: boolean };

export const initStateRoom:RoomDetailsState = {
  room: null,
  roomRecommend: [],
  roomSchedule: null,
  priceByDay: [],
  error: false
};

export const roomReducer: Reducer<RoomDetailsState, RoomReducerAction> = (
  state: RoomDetailsState = initStateRoom,
  action: RoomReducerAction
): RoomDetailsState => {
  switch (action.type) {
    case 'setRoomData':
      return updateObject<RoomDetailsState>(state, {
        room: action.room,
        roomRecommend: action.roomRecommend,
        roomSchedule: action.roomSchedule,
      });
    case 'setPriceByDay':
      return updateObject(state, { priceByDay: action.payload });
    case 'addPriceByDay':
      return updateObject(state, { priceByDay: [...state.priceByDay, ...action.payload] });
    case 'setErrorSSRRoomPage':
      return updateObject(state, { error: action.payload });
    case 'setRoomSchedule':
      return { ...state, roomSchedule: action.payload };
    default:
      return state;
  }
};

export const getData = async (idRoom:number, languageStatus:string) => {
  const query = {
    include:
      'details,merchant,comforts.details,media,district,city,places.guidebook,reviews.user',
  };

  const url = `rooms/${idRoom}?${qs.stringify(query)}`;

  return fetchRoom(url, languageStatus).catch(err => console.log(err));
};

export const getRoomRecommend = async (idRoom:number, languageStatus:string) => {
  const query = { include: `media,details,city,district` };

  const url = `rooms/room_recommend/${idRoom}?${qs.stringify(query)}`;

  return fetchRoom(url, languageStatus).catch(err => console.log(err));
};

export const getRoomSchedule = async (idRoom:number, languageStatus:string) => {
  const url = `rooms/available-date/${idRoom}`;

  return fetchRoom(url, languageStatus).catch(err => console.log(err));
};

export const getPriceByDay = async (
  idRoom: any,
  date_start: string = moment().format(DEFAULT_DATE_FORMAT),
  date_end: string = moment()
    .add(6, 'month')
    .endOf('month')
    .format(DEFAULT_DATE_FORMAT),
  initLanguage: string = 'en'
): Promise<PriceByDayRes[]> => {
  const query: BodyRequestPriceByDayRes = { date_start, date_end };

  const res: AxiosRes<PriceByDayRes[]> = await axios.get(
    `rooms/calendar-props/${idRoom}?${qs.stringify(query)}`,
    { headers: { 'Accept-Language': initLanguage } }
  );

  return res.data.data;
};
