import { ProfileInfoRes } from './../../../types/Profile/ProfileResponse';
import { createContext } from 'react';
import {axios} from 'utils/api';
import {INTERNET_BANKING, VISA} from 'types/globalTypes';
import {BookingCreateReq} from 'types/Booking/BookingRequests';
import {Dispatch} from 'redux';
import {RoomIndexRes} from 'types/Rooms/RoomResponses';
import {BookingIndexRes} from 'types/Booking/BookingResponses';
import {PaymentMethod, PaymentBankListRes} from 'types/Payment/PaymentResponse';

export const PaymentBookingContext = createContext<IPaymentContext | null>(null);

const fetchData = async (url:string, languageStatus:string) => {
  const res = await axios.get(url, {
    headers: { 'Accept-Language': languageStatus },
  });
  return res.data;
};

export interface IPaymentContext {
  state: PaymentState;
  dispatch: Dispatch<PaymentAction>;
}

export type PaymentState = {
  readonly customer: ProfileInfoRes | null;
  readonly bankList: PaymentMethod[] | null;
  readonly priceOfBooking: string;
};

export type PaymentAction = 
  | { type: "SET_INFO"; payload: ProfileInfoRes | null}
  | { type: "SET_PRICE"; payload: string}
  | { type: "SET_BANK_LIST"; payload: any}


export const PaymentBookingStateInit:PaymentState = {
  customer: null,
  priceOfBooking: '',
  bankList: null,

};

export const PaymentBookingReducer = (state: PaymentState, action: PaymentAction): PaymentState => {
  switch (action.type) {
    case 'SET_INFO':
      return { ...state, customer: action.payload };
    case 'SET_PRICE':
      return { ...state, priceOfBooking: action.payload };
    case 'SET_BANK_LIST':
      return { ...state, bankList: action.payload };
    default:
      return state;
  }
};

export const priceCalculate = async (params:BookingCreateReq, languageStatus:string) => {
  const data = {
    room_id: params.room_id,
    checkin: params.checkin,
    checkout: params.checkout,
    number_of_guests: params.number_of_guests,
    booking_type: params.booking_type,
  };

  const res = await axios.post(
    'bookings/calculate-price-with-specific-day-price',
    data,
    { headers: { 'Accept-Language': languageStatus } },
  );

  return res.data;
};

export const redirectToBaoKim = async (uuid:string, bank_id:number, languageStatus:string) => {
  const request = {
    payment_method: bank_id === 128 ? VISA : INTERNET_BANKING,
    bank_payment_method_id: bank_id,
  };

  const res = await axios.post(`payment/${uuid}`, request, {
    headers: { 'Accept-Language': languageStatus },
  });
  return res.data.data;
};

export const getProfile = (dispatch:Dispatch, languageStatus:string) => {
  const url = `profile?include=city,district`;

  fetchData(url, languageStatus)
    .then(res => dispatch(setInfo(res.data)))
    .catch(err => console.log(err));
};

const setInfo = (payload: ProfileInfoRes) => ({ type: 'SET_INFO', payload });
const setPrice =(payload: any)  => ({ type: 'SET_PRICE', payload });

