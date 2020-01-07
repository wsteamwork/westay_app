export interface PriceByDayRes {
  date: string;
  price_day: number;
  price_hour: number;
  blocked: boolean;
  available_hour?: (string)[];
}

export interface BodyRequestPriceByDayRes {
  date_start: string;
  date_end: string;
}
