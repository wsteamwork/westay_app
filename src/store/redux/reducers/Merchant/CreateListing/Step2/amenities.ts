import { Reducer, Dispatch } from 'redux';
import {updateObject} from 'utils/mixins';
import {AxiosRes} from 'types/ResponseTemplate';
import {axios_merchant} from 'utils/api';
import {AmenitiesIndexRes} from 'types/LTR/Amenities/AmenitiesResponses';

export type AmenitiesReducerState = {
  room_id: number | null;
  amentitiesList: any;
  common: number[];
  livingrooms: number[];
  bedrooms: number[];
  kitchens: number[];
  bathrooms: number[];
  entertainment: number[];
  facilities: number[];
  others: number[];
  outdoors: number[];
  count_amenities: number;
  error: boolean;
};

export const init: AmenitiesReducerState = {
  room_id: null,
  amentitiesList: null,
  common: [],
  livingrooms: [],
  bedrooms: [],
  kitchens: [],
  bathrooms: [],
  entertainment: [],
  facilities: [],
  outdoors: [],
  others: [],
  count_amenities: 0,
  error: false
};

export type AmenitiesReducerAction =
  | { type: 'setRoomId'; payload: number }
  | { type: 'setCommon'; payload: number[] }
  | { type: 'setAmenitiesList'; payload: any }
  | { type: 'setLivingRooms'; payload: number[] }
  | { type: 'setBedRooms'; payload: number[] }
  | { type: 'setKitchens'; payload: number[] }
  | { type: 'setBathRooms'; payload: number[] }
  | { type: 'setEntertainment'; payload: number[] }
  | { type: 'setFacilities'; payload: number[] }
  | { type: 'setOutdoors'; payload: number[] }
  | { type: 'setOthers'; payload: number[] }
  | { type: 'setCountAmenities'; payload: number }
  | { type: 'setError'; payload: boolean };

export const amenitiesReducer: Reducer<AmenitiesReducerState, AmenitiesReducerAction> = (
  state: AmenitiesReducerState = init,
  action: AmenitiesReducerAction
): AmenitiesReducerState => {
  switch (action.type) {
    case 'setRoomId':
      return updateObject(state, { room_id: action.payload });
    case 'setAmenitiesList':
      return updateObject(state, { amentitiesList: action.payload });
    case 'setCommon':
      return updateObject(state, { common: action.payload });
    case 'setLivingRooms':
      return updateObject(state, { livingrooms: action.payload });
    case 'setBedRooms':
      return updateObject(state, { bedrooms: action.payload });
    case 'setKitchens':
      return updateObject(state, { kitchens: action.payload });
    case 'setBathRooms':
      return updateObject(state, { bathrooms: action.payload });
    case 'setEntertainment':
      return updateObject(state, { entertainment: action.payload });
    case 'setFacilities':
      return updateObject(state, { facilities: action.payload });
    case 'setOutdoors':
      return updateObject(state, { outdoors: action.payload });
    case 'setOthers':
      return updateObject(state, { others: action.payload });
    case 'setCountAmenities':
      return updateObject(state, { count_amenities: action.payload });
    case 'setError':
      return updateObject(state, { error: action.payload });
    default:
      return state;
  }
};

export const getDataAmenities = async (
  id: any,
  dispatch: Dispatch<AmenitiesReducerAction>
): Promise<any> => {
  try {
    const res: AxiosRes<any> = await axios_merchant.get(`long-term-rooms/${id}`);
    const room_id = res.data.data.room_id;
    const amenities = res.data.data.comforts;
    const livingrooms = amenities.kitchens ? amenities.kitchens.map((item: AmenitiesIndexRes) => item.id) : [];
    const bedrooms = amenities.bedrooms ? amenities.bedrooms.map((item: AmenitiesIndexRes) => item.id) : [];
    const kitchens = amenities.kitchens ? amenities.kitchens.map((item: AmenitiesIndexRes) => item.id) : [];
    const bathrooms = amenities.bathrooms ? amenities.bathrooms.map((item: AmenitiesIndexRes) => item.id) : [];
    const entertainment = amenities.entertainment
      ? amenities.entertainment.map((item: AmenitiesIndexRes) => item.id)
      : [];
    const facilities = amenities.facilities ? amenities.facilities.map((item: AmenitiesIndexRes) => item.id) : [];
    const outdoors = amenities.outdoors ? amenities.outdoors.map((item: AmenitiesIndexRes) => item.id) : [];
    const others = amenities.others ? amenities.others.map((item: AmenitiesIndexRes) => item.id) : [];
    const count_amenities =res.data.data.total_comforts;

    dispatch({ type: 'setRoomId', payload: room_id });
    dispatch({ type: 'setLivingRooms', payload: livingrooms });
    dispatch({ type: 'setBedRooms', payload: bedrooms });
    dispatch({ type: 'setKitchens', payload: kitchens });
    dispatch({ type: 'setBathRooms', payload: bathrooms });
    dispatch({ type: 'setEntertainment', payload: entertainment });
    dispatch({ type: 'setFacilities', payload: facilities });
    dispatch({ type: 'setOutdoors', payload: outdoors });
    dispatch({ type: 'setOthers', payload: others });
    dispatch({ type: 'setCountAmenities', payload: count_amenities });

    return amenities;
  } catch (error) {
    dispatch({ type: 'setError', payload: true });
  }
};

export const getAmenitiesList = async (dispatch: Dispatch<AmenitiesReducerAction>) => {
  try {
    const res: AxiosRes<any> = await axios_merchant.get('comforts');
    dispatch({ type: 'setAmenitiesList', payload: res.data });
  } catch (error) {
    dispatch({ type: 'setError', payload: true });
  }
};
