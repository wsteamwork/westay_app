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

const SearchFieldInit = {
  number_guest: 1,
  number_room: 1,
  check_in: '',
  check_out: '',
  bookingType: 1,
  time_in: '07:00:00',
  time_out: '12:00:00',
  searchText: '',
  amenities: null,
  room_type: null,
  rent_type: null,
  instant_book: null,
  price_day_from: 200000,
  price_day_to: 50000000,
};

const searchFieldReducer = (state = SearchFieldInit, action:any) => {
  switch (action.type) {
    case SET_NUMBER_GUEST:
      return { ...state, number_guest: action.payload };
    case SET_CHECK_IN:
      return { ...state, check_in: action.payload };
    case SET_CHECK_OUT:
      return { ...state, check_out: action.payload };
    case SET_BOOKING_TYPE:
      return { ...state, bookingType: action.payload };
    case SET_TIME_IN:
      return { ...state, time_in: action.payload };
    case SET_TIME_OUT:
      return { ...state, time_out: action.payload };
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
    default:
      return state;
  }
};

export default searchFieldReducer;
