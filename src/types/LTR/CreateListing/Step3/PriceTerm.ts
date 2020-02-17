export interface IPriceST {
  prices: IPriceShortTerm
}

export interface IPriceLT {
  prices: IPriceLongTerm
}

export interface IPriceShortTerm {
  price_charge_guest: number,
  rent_type: number,
  price_day: number,
  price_hour: number,
  price_after_hour: number,
  cleaning_fee:number,
  is_discount?: number,
  price_day_discount?: number,
  price_hour_discount?: number,
}

export interface IPriceLongTerm {
  term_1_month: number,
  term_2_month: number,
  term_3_month: number,
  term_6_month: number,
  term_12_month: number,
}


