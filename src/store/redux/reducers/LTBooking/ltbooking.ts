import { VISA, INTERNET_BANKING } from './../../../../types/globalTypes';
import { Reducer, Dispatch } from 'redux';
import { AxiosRes, BaseResponse } from './../../../../types/ResponseTemplate';
import { axios } from './../../../../utils/api';
import {
  LTBookingPriceCalculatorReq,
  LTBookingCreateReq,
} from './../../../../types/Booking/BookingRequests';
import { updateObject } from 'utils/mixins';
import { PaymentBankListRes, PaymentMethod } from './../../../../types/Payment/PaymentResponse';
import {
  LTBookingPriceCalculatorRes,
  LTBookingIndexRes,
} from './../../../../types/Booking/BookingResponses';
import qs from 'query-string';

export type LTBookingReducerState = {
  readonly roomId: number;
  readonly movein: string | null;
  readonly moveout: string | null;
  readonly numberOfGuests: number;
  readonly maxGuestRoom: number;
  readonly bankList: PaymentMethod[] | null;
  readonly LTBookingPriceCalculate: LTBookingPriceCalculatorRes | null;
  readonly LTDataInvoice: PaymentBankListRes | null;
  readonly LTPaymentError: boolean;
  readonly bookings: LTBookingIndexRes[];
  readonly error: boolean;
};

export type LTBookState = {
  readonly LTBookingPriceCalculate: LTBookingPriceCalculatorRes;
};

export type LTBookingAction =
  | { type: 'setRoomId'; payload: number }
  | { type: 'setMoveIn'; payload: string }
  | { type: 'setMoveOut'; payload: string }
  | { type: 'setNumberOfGuests'; payload: number }
  | { type: 'setMaxGuestRoom'; payload: number }
  | { type: 'setLTBookingPriceCalculate'; payload: LTBookingPriceCalculatorRes }
  | { type: 'setLTDataInvoice'; payload: PaymentBankListRes }
  | { type: 'setLTPaymentError'; payload: boolean }
  | { type: 'setBankList'; payload: PaymentMethod[] }
  | { type: 'setDataBookingByStatus'; payload: LTBookingIndexRes[] }
  | { type: 'setError'; payload: boolean };

export const init: LTBookingReducerState = {
  roomId: 0,
  movein: '',
  moveout: '',
  numberOfGuests: 1,
  maxGuestRoom: 1,
  LTBookingPriceCalculate: null,
  LTDataInvoice: null,
  bankList: null,
  LTPaymentError: false,
  bookings: [],
  error: false,
};

export const ltBookingReducer: Reducer<LTBookingReducerState, LTBookingAction> = (
  state: LTBookingReducerState = init,
  action: LTBookingAction,
): LTBookingReducerState => {
  switch (action.type) {
    case 'setRoomId':
      return updateObject(state, { roomId: action.payload });
    case 'setMoveIn':
      return updateObject(state, { movein: action.payload });
    case 'setMoveOut':
      return updateObject(state, { moveout: action.payload });
    case 'setNumberOfGuests':
      return updateObject(state, { numberOfGuests: action.payload });
    case 'setMaxGuestRoom':
      return updateObject(state, { maxGuestRoom: action.payload });
    case 'setBankList':
      return updateObject(state, { bankList: action.payload });
    case 'setLTBookingPriceCalculate':
      return updateObject(state, { LTBookingPriceCalculate: action.payload });
    case 'setLTDataInvoice':
      return updateObject(state, { LTDataInvoice: action.payload });
    case 'setLTPaymentError':
      return updateObject(state, { LTPaymentError: action.payload });
    case 'setDataBookingByStatus':
      return updateObject(state, { bookings: action.payload });
    case 'setError':
      return updateObject(state, { error: action.payload });
    default:
      return state;
  }
};

export const getLTCalculatedBookingPrice = async (
  body: LTBookingPriceCalculatorReq,
): Promise<LTBookingPriceCalculatorRes> => {
  const { move_in, move_out, long_term_room_id } = body;
  const req: LTBookingPriceCalculatorReq = {
    long_term_room_id: long_term_room_id,
    move_in,
    move_out,
  };

  const res: AxiosRes<LTBookingPriceCalculatorRes> = await axios.post(
    `long-term-bookings/price-calculator`,
    req,
  );

  return res.data.data;
};

export const createLTBooking = async (req: LTBookingCreateReq): Promise<LTBookingIndexRes> => {
  const res: AxiosRes<LTBookingIndexRes> = await axios.post(
    'long-term-bookings?include=contracts',
    req,
  );
  return res.data.data;
};

export const getBankList = async (uuid: string, languageStatus: string) => {
  const url = `long-term-booking-bank-list/${uuid}`;
  const res = await axios.get(url, {
    headers: { 'Accept-Language': languageStatus },
  });
  return res.data;
};

export const redirectToBaoKim = async (uuid: string, bank_id: number, languageStatus: string) => {
  const request = {
    payment_method: bank_id === 128 ? VISA : INTERNET_BANKING,
    bank_payment_method_id: bank_id,
  };

  const res = await axios.post(`long-term-booking-payment/${uuid}`, request, {
    headers: { 'Accept-Language': languageStatus },
  });
  return res.data;
};

export const getLongTermBookingList = async (
  token: string,
  dispatch: Dispatch<LTBookingAction>,
  languageStatus: string,
  status: string[],
) => {
  let statusList = status.join();
  let query = {
    size: 10,
    include: 'contracts,longTermRoom',
    status: statusList,
  };
  const url = `long-term-bookings?${qs.stringify(query)}`;
  let res = await axios.get(url, {
    headers: { Authorization: token, 'Accept-Language': languageStatus },
  });
  if (res) {
    let bookingListLT = res.data;
    dispatch({ type: 'setDataBookingByStatus', payload: bookingListLT });
  } else {
    dispatch({ type: 'setError', payload: true });
  }
};
