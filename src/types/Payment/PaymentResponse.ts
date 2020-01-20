
import { TransformerInclude } from '../ResponseTemplate';
import {BookingIndexRes, LTBookingIndexRes} from 'types/Booking/BookingResponses';
import {LTRoomIndexRes} from 'types/LTR/LTRoom/LTRoom';

export interface PaymentBankListRes extends BookingIndexRes, LTBookingIndexRes {
  bank_list: PaymentMethod[];
  longTermRoom?: TransformerInclude<LTRoomIndexRes>;
}

export interface PaymentMethod {
  title: string;
  payment_method: number;
  status: boolean;
  banks: BaoKimBankInfo[];
  default: boolean;
}

export type PaymentRouterParams = {
  uuid: string;
};

export type BaoKimBankInfo = {
  id: number;
  logo_url: string;
  name: string;
};
