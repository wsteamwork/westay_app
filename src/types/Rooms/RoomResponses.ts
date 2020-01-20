import {ComfortIndexRes} from 'types/Comforts/ComfortResponses';
import {MediaIndexRes} from 'types/Media/MediaIndexResponse';
import {DistrictRes} from 'types/Districts/DistrictResponse';
import {PlaceIndexResponse} from 'types/Places/PlaceIndexResponse';
import {CityRes} from 'types/Cities/CityResponse';
import {RoomReviewIndexResponse, UserReviewRes} from 'types/Rooms/RoomReviewIndexResponse';
import {TransformerInclude} from 'types/ResponseTemplate';

export interface RoomIndexRes {
  id: number;
  merchant_id: number;
  room_type: number;
  room_type_txt: string;
  max_guest: number;
  max_additional_guest: number;
  number_bed: number;
  bathroom: number;
  number_room: number;
  city_id: number;
  district_id: number;
  checkin: string;
  checkout: string;
  price_day: number;
  price_hour: number;
  price_after_hour: number;
  price_charge_guest: number;
  cleaning_fee: number;
  standard_point: number;
  is_manager: number;
  manager: number;
  manager_txt: string;
  instant_book: number;
  hot: number;
  hot_txt: string;
  new: number;
  latest_deal: number;
  latest_deal_txt: string;
  rent_type: number;
  rent_type_txt: string;
  longitude: string;
  latitude: string;
  status: number;
  cleanliness: number | null;
  quality: number | null;
  service: number | null;
  valuable: number | null;
  avg_rating: number;
  avg_cleanliness: number;
  avg_quality: number;
  avg_service: number;
  avg_valuable: number;
  total_review: number;
  total_recommend: number | null;
  avg_rating_txt: string;
  is_discount: number | null;
  is_discount_txt: string;
  price_day_discount: number;
  price_hour_discount: number;
  settings: Settings;
  details: TransformerInclude<RoomDetails[]>;
  user: TransformerInclude<UserReviewRes>;
  comforts: TransformerInclude<ComfortIndexRes[]>;
  media: TransformerInclude<MediaIndexRes[]>;
  city: TransformerInclude<CityRes>;
  district: TransformerInclude<DistrictRes>;
  merchant: TransformerInclude<Merchant>;
  places: TransformerInclude<PlaceIndexResponse[]>;
  reviews: TransformerInclude<RoomReviewIndexResponse[]>;
  prices: TransformerInclude<PriceSpecialDays[]>;
  room_name: string;
  avatar_image: string;
}

export interface RoomDetails {
  name: string;
  address: string;
  description: string;
  space: string;
  note: string;
}

export type RoomScheduleRes = {
  blocks: string[];
};

export type LTRoomAvailableRes = {
  move_in: LTAvailableDate[];
  move_out: any[];
};

export type LTAvailableDate = {
  date: string;
  blocked: boolean;
};

export interface NumberRoomCity {
  city_id: number;
  name_city: string;
  image: string;
  total_rooms: number;
  average_price: string;
}

export interface Collections {
  id: number;
  image: string;
  status: number;
  hot: number;
  new: number;
  details: TransformerInclude<CollectionsDetail[]>;
  rooms: TransformerInclude<RoomIndexRes[]>;
}

export interface CollectionsDetail {
  id: number;
  collection_id: number;
  name: string;
  description: string;
  lang: string;
}

export interface TypeApartment {
  id: number;
  value: string;
  status?: number;
  image: string;
}

export interface Merchant {
  id: number;
  uuid: string;
  name: string;
  gender: number;
  gender_txt: string;
  birthday: string;
  avatar: string;
  avatar_url: string;
  number_room: number;
}

export interface Settings {
  days: number;
  booking_cancel_text: string;
  no_booking_cancel: number;
}

export interface PriceSpecialDays {
  id: number;
  weekday: number | null;
  day: string;
  price_day: number;
  price_hour: number;
  price_after_hour: number;
  price_charge_guest: number;
  status: number;
  status_txt: string;
}

export interface Coordinate {
  latitude: number;
  longitude: number
}

export interface MapCoords {
  lat_min: number;
  lat_max: number;
  long_min: number;
  long_max: number;
}
