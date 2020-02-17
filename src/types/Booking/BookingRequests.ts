import {BaseGetRequestParams} from 'types/RequestTemplate';

export interface BookingCreateReq {
  name: string;
  name_received?: string | null;
  phone: number | string;
  phone_received?: number | string;
  sex?: number;
  birthday?: string;
  email: string;
  email_received?: string;
  room_id: number;
  staff_id?: number;
  staff_note?: string;
  checkin: string;
  checkout: string;
  additional_fee?: number;
  price_discount?: number;
  coupon?: string | null;
  note?: string;
  number_of_guests: number;
  customer_id?: number;
  status?: number;
  type?: number;
  booking_type: number;
  payment_method: number;
  payment_status: number;
  source: number;
  exchange_rate?: number;
  money_received?: number;
  confirm?: number;
  booking_purpose?: number;
}

export interface LTBookingCreateReq {
  name: string;
  phone: string;
  email: string;
  long_term_room_id: number;
  move_in: string;
  move_out: string;
  note: string;
  guests: {
    total_guests: number;
  };
  source: number;
}

export interface BookingPriceCalculatorReq {
  room_id: number;
  checkin: string;
  checkout: string;
  additional_fee?: number;
  price_discount?: number;
  coupon?: string;
  number_of_guests: number;
  booking_type: number;
}

export interface BookingPayment {
  hosting_id: number | null;
  checkin: string;
  checkout: string;
  checkin_hour: number;
  checkout_hour: number;
  checkin_minute?: number;
  checkout_minute?: number;
  number_guests: number;
  booking_type: number;
}

export interface BookingIndexParams extends BaseGetRequestParams {
  status?: number;
  size?: number;
}

export interface LTBookingReq {
  long_term_room_id: number;
  move_in: string;
  move_out: string;
  number_of_guests?: number;
}

export interface LTBookingPriceCalculatorReq {
  long_term_room_id: number;
  move_in: string;
  move_out: string;
}
