import {RoomIndexRes} from 'types/Rooms/RoomResponses';
import {MediaIndexRes} from 'types/Media/MediaIndexResponse';
import {TransformerInclude} from 'types/ResponseTemplate';

export interface BookingIndexRes {
  id: number;
  uuid: string;
  code: string;
  name: string;
  sex: number;
  sex_txt: string;
  birthday: string;
  phone: string;
  email: string;
  email_received: string;
  name_received: string;
  phone_received: string;
  room_id: number;
  checkin: number;
  checkout: number;
  number_of_guests: number;
  price_original: number;
  price_discount: number;
  coupon_discount: number;
  coupon: string;
  coupon_txt: string;
  note: string;
  instant_book: number;
  service_fee: number;
  additional_fee: number;
  total_fee: number;
  payment_status: number;
  payment_status_txt: string;
  payment_method: number;
  payment_method_txt: string;
  status: number;
  status_txt: string;
  exchange_rate: number;
  total_refund: number;
  email_reminder: number;
  email_reviews: number;
  price_range: number;
  review_url: string | null;
  status_reviews: number;
  created_at: string;
  total_txt: string;
  updated_at: string;
  bank_list: any;
  city_id: number;
  district_id: number;
  room: TransformerInclude<RoomIndexRes>;
  media: TransformerInclude<MediaIndexRes[]>;
  cancel: TransformerInclude<CancelReasonRes[]>;
}

export interface LTBookingIndexRes {
  id: number;
  uuid: string;
  code: string;
  name: string;
  phone: string;
  email: string;
  email_received: string;
  name_received: string;
  phone_received: string;
  customer_id: number;
  merchant_id: number;
  latest_move_in: string;
  latest_move_out: string;
  long_term_room_id: number;
  deposit: number;
  note: string;
  coupon: string;
  price_and_contract: LTPriceAndContract[];
  guests: LTBookingGuests;
  type: any;
  source: string;
  booking_purpose: string;
  status_reviews: number;
  bank_list: any;
  contracts: TransformerInclude<LTBookingContracts>;
}

export interface LTBookingContracts {
  id: number;
  uuid: string;
  booking_id: string;
  price_original: string;
  price_with_fee: string;
  range_stay: number;
  fee_included: any[];
  fee_not_included: any[];
  status: number;
  move_in: string;
  move_out: string;
  status_txt: string;
  next_payment_due: {
    payment_due_date: string;
    payment_amount: number;
  };
  payment: {
    payment_term: NumberConstructor;
    payment_period: LTPaymentPeriod[];
  };
  created_at: string;
  updated_at: string;
}
export interface LTPaymentPeriod {
  id: number;
  payment_due_date: string;
  payment_status: number;
  payment_method: number;
  payment_amount: number;
  notify: number;
}

export interface LTPriceAndContract {
  price_original: number;
  deposit: number;
  price_with_fee: number;
  range_stay: number;
  fee_included: any[];
  fee_not_included: any[];
  payment_term: number;
  status: number;
  move_in: string;
  move_out: string;
}

interface LTBookingGuests {
  total_guests: number;
}

export interface BookingPriceCalculatorRes {
  checkin: number;
  checkout: number;
  room_id: number;
  room_avatar: string;
  service_fee: number;
  charge_additional_guest: number;
  charge_additional_hour: number;
  number_of_guests: number;
  booking_type: number;
  days: number;
  hours: number;
  price_original: number;
  total_fee: number;
  avg_price: number;
  each_day_price?: (EachDayPriceEntity)[] | null;
}
export interface EachDayPriceEntity {
  date: string;
  price_day: number;
  price_hour: number;
}

export interface CancelReasonRes {
  id: number;
  code: number;
  code_txt: string;
  note: string;
}

export interface LTBookingPriceCalculatorRes {
  price_original: number;
  deposit: number;
  price_with_fee: number;
  range_stay: number;
  fee_included: any[];
  fee_not_included: any[];
  price_per_month: number;
  last_payment_amount: number;
  amount_per_payment: number;
  payment_term: number;
}
