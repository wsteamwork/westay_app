import {BaseGetRequestParams} from 'types/RequestTemplate';

export interface RoomIndexGetParams extends BaseGetRequestParams, Partial<MapCoords> {
  name?: string;
  city?: string | number;
  district?: string;
  status?: string;
  merchant?: string;
  manager?: string | number;
  instant_book?: string | number;
  hot?: string | number;
  new?: string | number;
  rooms?: number | string;
  most_popular?: any;
  sort_price_day?: number | string;
  sort_total_review?: string | number | null;
  discount?: string | number | null;
  number_bed?: string;
  number_guest?: string | number;
  check_in?: string;
  check_out?: string;
  rent_type?: string | number;
  type_room?: string;
  latest_deal?: string;
  comfort_lists?: string;
  price_day_from?: string | number;
  price_day_to?: string | number;
  price_hour_from?: string;
  price_hour_to?: string;
  cleanliness?: string;
  service?: string;
  valuable?: string;
  quality?: string;
  avg_rating?: string;
  recommend?: string;
  standard_point?: string;
  city_id?: string | number;
  district_id?: string | number;
}

export interface MapCoords {
  lat_min: number;
  lat_max: number;
  long_min: number;
  long_max: number;
}

export interface RoomUrlParams {
  name?: string;
  page?: number;
  city_id?: string | number;
  district_id?: number | string;
  number_of_rooms?: number;
  rent_type?: number;
  check_in?: string;
  check_out?: string;
  number_of_guests?: number;
  price_day_from?: string;
  price_day_to?: string;
  instant_book?: string;
  most_popular?: string;
  lowest_price?: string;
  most_review?: string;
  deal_hot?: string;
  rating?: string;
  view?: 'map' | 'list';
  amenities?: string;
  type_room?: string;
  sort_total_review?: string;
  sort_price_day?: string;
  discount?: string;
}


// LONG TERM
export interface LTRoomIndexGetParams extends BaseGetRequestParams, Partial<MapCoords> {
  name?: string;
  city_id?: number;
  district_id?: number;
  bedrooms?: number;
  number_guest?: number;
  accommodation_type?: number;
  comfort_lists?: string;
  min_price?: number;
  max_price?: number;
  instant_book?: number;
  discount?: number;
  page?: number;
}

export interface LTRoomUrlParams {
  name?: string;
  city_id?: number;
  district_id?: number;
  bedrooms?: number;
  number_guest?: number;
  accommodation_type?: number;
  comfort_lists?: string;
  min_price?: number;
  max_price?: number;
  instant_book?: number;
  discount?: number;
  page?: number;
}

export interface IDataCollections {
  data: [],
  meta: number
}
