import {
  SET_NUMBER_GUEST,
  SET_SEARCH_TEXT,
  SET_CHECK_IN,
  SET_ROOM_TYPE,
  SET_RENT_TYPE,
  SET_TIME_IN,
  SET_PRICE_DAY_TO,
  SET_AMENITIES,
  SET_BOOKING_TYPE,
  SET_CHECK_OUT,
  SET_NUMBER_ROOM,
  SET_INSTANT_BOOK,
  SET_PRICE_DAY_FROM, SET_TIME_OUT,
} from 'types/Search/searchTypes';
import {Reducer} from 'redux';
import {updateObject} from 'utils/mixins';

export type SearchFilterState = {
  readonly city_id?: number | null;
  readonly district_id?: number | null;
  readonly number_guest: number;
  readonly searchText?: string;
  readonly number_room: number;
  readonly bookingType?: number;
  readonly check_in: string ;
  readonly check_out: string ;
  readonly amenities?: number[] | null;
  readonly room_type?: number;
  readonly rent_type?: number;
  readonly instant_book?: number;
  readonly price_day_from?: number;
  readonly price_day_to?: number;
  readonly leaseTypeGlobal?: 0 | 1; // 0 short term | 1 : long-term
  readonly leaseTypePathName?: string; // /rooms :short term | /long-term-rooms : long-term
};

export type SearchFilterAction =
  | { type: 'SET_BOOKING_TYPE'; payload: number }
  | { type: 'SET_ROOM_TYPE'; payload: number }
  | { type: 'SET_RENT_TYPE'; payload: number }
  | { type: 'SET_INSTANT_BOOK'; payload: number }
  | { type: 'SET_NAV_BOOKING_TYPE'; payload: number }
  | { type: 'SET_NUMBER_GUEST'; payload: number }
  | { type: 'SET_NUMBER_ROOM'; payload: number }
  | { type: 'SET_AMENITIES'; payload: number[] }
  | { type: 'SET_SEARCH_TEXT'; payload: string }
  | { type: 'SET_SEARCH_CITY'; payload: number | undefined }
  | { type: 'SET_SEARCH_DISTRICT'; payload: number | undefined }
  | { type: 'SET_CHECK_IN'; payload: string }
  | { type: 'SET_CHECK_OUT'; payload: string }
  | { type: 'SET_PRICE_DAY_FROM'; payload: number }
  | { type: 'SET_PRICE_DAY_TO'; payload: number }
  | { type: 'setLeaseTypeGlobal'; leaseTypeGlobal: 0 | 1; leaseTypePathName: string }

const SearchFieldInit:SearchFilterState = {
  city_id: null,
  district_id: null,
  number_guest: 1,
  number_room: 1,
  check_in: '',
  check_out: '',
  bookingType: 1,
  searchText: '',
  amenities: null,
  room_type: 0,
  rent_type: 2,
  instant_book: 0,
  price_day_from: 200000,
  price_day_to: 50000000,
  leaseTypeGlobal: 0,
  leaseTypePathName: '/rooms'
};

const searchFieldReducer : Reducer<SearchFilterState, SearchFilterAction> =  (
  state:SearchFilterState = SearchFieldInit,
  action:SearchFilterAction
): SearchFilterState => {
  switch (action.type) {
    case SET_NUMBER_GUEST:
      return { ...state, number_guest: action.payload };
    case SET_CHECK_IN:
      return { ...state, check_in: action.payload };
    case SET_CHECK_OUT:
      return { ...state, check_out: action.payload };
    case SET_BOOKING_TYPE:
      return { ...state, bookingType: action.payload };
    case SET_SEARCH_TEXT:
      return { ...state, searchText: action.payload };
    case SET_NUMBER_ROOM:
      return { ...state, number_room: action.payload };
    case SET_AMENITIES:
      return { ...state, amenities: action.payload };
    case SET_ROOM_TYPE:
      return { ...state, room_type: action.payload };
    case SET_RENT_TYPE:
      return { ...state, rent_type: action.payload };
    case SET_INSTANT_BOOK:
      return { ...state, instant_book: action.payload };
    case SET_PRICE_DAY_FROM:
      return { ...state, price_day_from: action.payload };
    case SET_PRICE_DAY_TO:
      return { ...state, price_day_to: action.payload };
    case 'setLeaseTypeGlobal':
      return updateObject(state, {
        leaseTypeGlobal: action.leaseTypeGlobal,
        leaseTypePathName: action.leaseTypePathName
      });
    default:
      return state;
  }
};

export default searchFieldReducer;
