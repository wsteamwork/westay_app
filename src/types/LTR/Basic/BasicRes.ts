export interface Listing {
  id: number;
  room_id: number;
  priority: number;
  prices: number;
  discount_prices: number;
  is_discount: number;
  is_discount_text: string;
  price_display: number;
  price_discount_display: number;
  included_services: number;
  not_included_services: number;
  bedrooms: {};
  bathrooms: {
    number_bathroom: number;
  };
  avatar: string;
  cover_phot: string;
  outdoors: string;
  furnitures: string;
  kitchens: string;
  livingrooms: string;
  about_room: string;
  address: string;
  long_term_rent_type: {
    rent_type: number;
    rent_type_txt: string;
  };
  short_term_rent_type: {
    rent_type: number;
    rent_type_txt: string;
  };
  building: string;
  latitude: string;
  longitude: string;
  accommodation_type: number;
  accommodation_type_txt: string;
  instant_book: number;
  instant_book_txt: string;
  display: number;
  stay_with_host;
  stay_with_host_txt;
  short_term_room: {
    price_day: number;
    price_hour: number;
    price_after_hour: number;
    is_discount: number;
    price_day_discount: number;
    price_hour_discount: number;
    price_charge_guest: number;
    cleaning_fee: number;
    rent_type: number;
  };
  merchant_id: number;
  refund_settings: any[];
  payment_method: number;
  minimum_month: number;
  city_id: number;
  district_id: number;
  percent: number;
  comission: number;
  comforts: number;
  created_at: string;
  updated_at: string;
}
