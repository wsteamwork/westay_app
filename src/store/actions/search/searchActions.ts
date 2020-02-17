import { axios } from 'utils/api';
import {
  SET_SEARCH_TEXT,
  SET_NUMBER_GUEST,
  SET_CHECK_IN,
  SET_ROOM_TYPE,
  GET_CITY,
  SET_RENT_TYPE,
  ARRAY_RENT_TYPE,
  SET_DATE,
  SET_TIME_IN,
  SET_PRICE_DAY_TO,
  SET_AMENITIES,
  SET_BOOKING_TYPE,
  SET_CHECK_OUT,
  SET_NUMBER_ROOM,
  ARRAY_AMENITIES,
  SET_INSTANT_BOOK,
  SET_PRICE_DAY_FROM,
  SET_TIME_OUT,
  SET_CITY_DISTRICT, SET_TOGGLE_CHOOSE_PEOPLE,
} from 'types/Search/searchTypes';


export const setNumberGuest = (payload: number) => (dispatch: (arg0: { type: string; payload: number; }) => void) => {
  dispatch({
    type: SET_NUMBER_GUEST,
    payload,
  });
};

export const setCheckIn = (payload: any) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  dispatch({
    type: SET_CHECK_IN,
    payload,
  });
};

export const setCheckOut = (payload: any) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  dispatch({
    type: SET_CHECK_OUT,
    payload,
  });
};

export const setEmptyCityDistrict = () => (dispatch: (arg0: { type: string; payload: null; }) => any) =>
  dispatch({
    type: SET_CITY_DISTRICT,
    payload: null,
  });

export const setCityDistrict = (value: any, languageStatus: string) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  axios
    .get(`search-suggestions?key=${value}`, {
      headers: { 'Accept-Language': languageStatus },
    })
    .then(res => res.data.data)
    .then(data => {
      dispatch({
        type: SET_CITY_DISTRICT,
        payload: data[0],
      });
    })
    .catch(err => console.log(err));
};

export const setBookingType = (payload: any) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  dispatch({
    type: SET_BOOKING_TYPE,
    payload,
  });
};

export const setDate = (date: any) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  dispatch({
    type: SET_DATE,
    payload: date,
  });
};

export const setTimeIn = (time: any) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  dispatch({
    type: SET_TIME_IN,
    payload: time,
  });
};

export const setTimeOut = (time: any) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  dispatch({
    type: SET_TIME_OUT,
    payload: time,
  });
};

export const setSearchText = (text: string) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  dispatch({
    type: SET_SEARCH_TEXT,
    payload: text,
  });
};

export const getCity = (payload: any) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  dispatch({
    type: GET_CITY,
    payload,
  });
};

export const setNumberRoom = (payload: number) => (dispatch: (arg0: { type: string; payload: number; }) => any) =>
  dispatch({ type: SET_NUMBER_ROOM, payload });

export const setToggleChoosePeople = (payload: any) => (dispatch: (arg0: { type: string; payload: any; }) => any) =>
  dispatch({ type: SET_TOGGLE_CHOOSE_PEOPLE, payload });

export const setAmenities = (payload: any) => (dispatch: (arg0: { type: string; payload: any; }) => any) =>
  dispatch({ type: SET_AMENITIES, payload });

export const setAccommodationType = (payload: number | null) => (dispatch: (arg0: { type: string; payload: number | null; }) => any) =>
  dispatch({ type: SET_ROOM_TYPE, payload });

export const setRentType = (payload: number | null) => (dispatch: (arg0: { type: string; payload: number | null; }) => any) =>
  dispatch({ type: SET_RENT_TYPE, payload });

export const setInstantBook = (payload: number | null) => (dispatch: (arg0: { type: string; payload: number | null; }) => any) =>
  dispatch({ type: SET_INSTANT_BOOK, payload });

export const setPriceDayFrom = (payload: any) => (dispatch: (arg0: { type: string; payload: any; }) => any) =>
  dispatch({ type: SET_PRICE_DAY_FROM, payload });

export const setPriceDayTo = (payload: any) => (dispatch: (arg0: { type: string; payload: any; }) => any) =>
  dispatch({ type: SET_PRICE_DAY_TO, payload });

export const setArrayRentType = (payload: any) => (dispatch: (arg0: { type: string; payload: any; }) => any) =>
  dispatch({ type: ARRAY_RENT_TYPE, payload });

export const setArrayAmenities = (payload: any) => (dispatch: (arg0: { type: string; payload: any; }) => any) =>
  dispatch({ type: ARRAY_AMENITIES, payload });
