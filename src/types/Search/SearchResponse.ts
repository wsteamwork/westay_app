export const IS_SEARCH_CITY = 1;
export const IS_SEARCH_DISTRICT = 2;
export const IS_SEARCH_ROOM = 3;

export interface SearchSuggestRes {
  city?: SearchSuggestData[];
  district?: SearchSuggestData[];
  room?: SearchSuggestData[];
}
export interface SearchSuggestData {
  id: number;
  name: string;
  hot: number;
  hot_txt: string;
  type: number;
  description: string;
  city: string;
  district: string | '';
  number_room: number;
  country: string;
}
