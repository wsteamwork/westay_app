import { Reducer } from 'redux';
import { AxiosRes } from './../../../../types/ResponseTemplate';
import { axios } from './../../../../utils/api';
import { LTBookingPriceCalculatorReq, LTBookingCreateReq } from './../../../../types/Booking/BookingRequests';
import { updateObject } from 'utils/mixins';
import { PaymentBankListRes, PaymentMethod } from './../../../../types/Payment/PaymentResponse';
import { LTBookingPriceCalculatorRes, LTBookingIndexRes } from './../../../../types/Booking/BookingResponses';

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
  | { type: 'setBankList'; payload: PaymentMethod[]};

export const init: LTBookingReducerState = {
  roomId: 0,
  movein: '',
  moveout: '',
  numberOfGuests: 1,
  maxGuestRoom: 1,
  LTBookingPriceCalculate: null,
  LTDataInvoice: null,
  bankList: null,
  LTPaymentError: false
};

export const ltBookingReducer: Reducer<LTBookingReducerState, LTBookingAction> = (
  state: LTBookingReducerState = init,
  action: LTBookingAction
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
    default:
      return state;
  }
};

export const getLTCalculatedBookingPrice = async (
  body: LTBookingPriceCalculatorReq
): Promise<LTBookingPriceCalculatorRes> => {
  const { move_in, move_out, long_term_room_id } = body;
  const req: LTBookingPriceCalculatorReq = {
    long_term_room_id: long_term_room_id,
    move_in,
    move_out
  };

  const res: AxiosRes<LTBookingPriceCalculatorRes> = await axios.post(
    `long-term-bookings/price-calculator`,
    req
  );

  return res.data.data;
};

export const createLTBooking = async (req: LTBookingCreateReq): Promise<LTBookingIndexRes> => {
  const res: AxiosRes<LTBookingIndexRes> = await axios.post(
    'long-term-bookings?include=contracts',
    req
  );
  return res.data.data;
};
