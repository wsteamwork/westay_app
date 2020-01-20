import qs from 'query-string';
import { Dispatch } from 'react';
import {NumberRoomCity, TypeApartment, RoomIndexRes} from 'types/Rooms/RoomResponses';
import {updateObject} from 'utils/mixins';
import {AxiosRes} from 'types/ResponseTemplate';
import {axios} from 'utils/api';
import {ReducersActions} from 'store/redux/reducers/index';
import {RoomIndexGetParams} from 'types/Rooms/RoomRequests';
import {Reducer} from 'redux';

export type RoomHomepageAction =
  | { type: 'setRoomHot'; rooms: any[] }
  | { type: 'setRoomCity'; rooms: NumberRoomCity[] }
  // | { type: 'setRoomNew'; rooms: RoomIndexRes[] }
  | { type: 'setApartment'; rooms: TypeApartment[] };
// | { type: 'setCollections'; collections: Collections[] }
// | { type: 'setCollectionById'; collectionById: Collections };

export type RoomHomepageState = {
  readonly roomsHot: any[];
  readonly roomsCity: NumberRoomCity[];
  // readonly roomsNew: RoomIndexRes[];
  readonly apartments: TypeApartment[];
  // readonly collections: Collections[];
  // readonly collectionById: Collections;
};

export const init: RoomHomepageState = {
  roomsHot: [],
  roomsCity: [],
  // roomsNew: [],
  apartments: []
  // collections: [],
  // collectionById: null
};

export const roomHomepageReducer: Reducer<RoomHomepageState, RoomHomepageAction> = (
  state: RoomHomepageState = init,
  action: RoomHomepageAction
): RoomHomepageState => {
  switch (action.type) {
    case 'setRoomHot':
      return updateObject<RoomHomepageState>(state, { roomsHot: action.rooms });
    case 'setRoomCity':
      return updateObject<RoomHomepageState>(state, { roomsCity: action.rooms });
    // case 'setRoomNew':
    //   return updateObject<RoomHomepageState>(state, { roomsNew: action.rooms });
    case 'setApartment':
      return updateObject<RoomHomepageState>(state, { apartments: action.rooms });
    // case 'setCollections':
    //   return updateObject<RoomHomepageState>(state, { collections: action.collections });
    // case 'setCollectionById':
    //   return updateObject<RoomHomepageState>(state, { collectionById: action.collectionById });
    default:
      return state;
  }
};

export const getRoomsHomepageCollection = async (
  initLanguage: string =  'en',
  type: string
): Promise<any[]> => {
  // const query: Partial<RoomIndexGetParams> = {
  //   include: 'city,district',
  //   hot: 1,
  //   limit: 10
  // };
  const url = `long-term-rooms/home-page-collection/${type}`;

  const res: AxiosRes<any[]> = await axios.get(url, {
    headers: { 'Accept-Language': initLanguage }
  });

  return res.data.data;
};

export const getRoomHot = async (initLanguage: string =  'en'): Promise<RoomIndexRes[]> => {
  const query: Partial<RoomIndexGetParams> = {
    include: 'city,district',
    hot: 1,
    limit: 10
  };
  const url = `get-room-hot?${qs.stringify(query)}`;

  const res: AxiosRes<RoomIndexRes[]> = await axios.get(url, {
    headers: { 'Accept-Language': initLanguage }
  });

  return res.data.data;
};

export const getRoomCity = async (initLanguage: string =  'en'): Promise<NumberRoomCity[]> => {
  const query: Partial<RoomIndexGetParams> = {
    hot: 1
  };
  const res: AxiosRes<NumberRoomCity[]> = await axios.get(
    `rooms/number-room-by-city?${qs.stringify(query)}`,
    { headers: { 'Accept-Language': initLanguage } }
  );
  return res.data.data;
};

// export const getRoomNew = async (initLanguage: string =  'en'): Promise<RoomIndexRes[]> => {
//   const query: Partial<RoomIndexGetParams> = {
//     include: 'details,media,city,district',
//     limit: 10
//   };
//   const url = `get-new-room?${qs.stringify(query)}`;

//   const res: AxiosRes<RoomIndexRes[]> = await axios.get(url, {
//     headers: { 'Accept-Language': initLanguage }
//   });

//   return res.data.data;
// };

export const getApartments = async (initLanguage: string =  'en'): Promise<TypeApartment[]> => {
  const url = `rooms/room-type-homepage`;

  const res: AxiosRes<TypeApartment[]> = await axios.get(url, {
    headers: { 'Accept-Language': initLanguage }
  });

  return res.data.data;
};

// export const getCollections = async (initLanguage: string =  'en'): Promise<Collections[]> => {
//   const url = `collections?include=details,rooms`;

//   const res: AxiosRes<Collections[]> = await axios.get(url, {
//     headers: { 'Accept-Language': initLanguage }
//   });

//   return res.data.data;
// };

// export const getCollectionById = async (
//   id: any,
//   dispatch: Dispatch<ReducresActions>,
//   initLanguage: string =  'en'
// ): Promise<Collections> => {
//   const url = `collections/${id}?include=details,rooms.media,rooms.details,rooms.city,rooms.district`;

//   const res: AxiosRes<Collections> = await axios.get(url, {
//     headers: { 'Accept-Language': initLanguage }
//   });

//   dispatch({ type: 'setCollectionById', collectionById: res.data.data });

//   return res.data.data;
// };

export const getRoomsHomepage = async (
  dispatch: Dispatch<ReducersActions>,
  initLanguage: string =  'en'
): Promise<Omit<RoomHomepageState, 'collectionById'>> => {
  const res = await Promise.all([
    getRoomsHomepageCollection(initLanguage, 'editor_choice'),
    getRoomCity(initLanguage),
    getApartments(initLanguage)
    // getCollections(initLanguage)
  ]);
  const [roomsHot, roomsCity, apartments] = res;

  dispatch({ type: 'setRoomCity', rooms: roomsCity });
  dispatch({ type: 'setApartment', rooms: apartments });
  dispatch({ type: 'setRoomHot', rooms: roomsHot });
  // dispatch({ type: 'setCollections', collections: collections });

  return {
    roomsHot,
    roomsCity,
    apartments
    // collections
  };
};
