import {
  ARRAY_AMENITIES,
  GET_CITY,
  ARRAY_RENT_TYPE,
  SET_CITY_DISTRICT,
  SET_TOGGLE_CHOOSE_PEOPLE,
} from 'types/Search/searchTypes';
import {Reducer} from 'redux';
import {CityType} from 'types/Cities/CityResponse';
import {SearchSuggestRes} from 'types/Search/SearchResponse';

export type CityDistrictState = {
  city_district: SearchSuggestRes | null,
  currCity: CityType | null,
  openChoosePeople: boolean,
  arrayRentType: number[],
  arrayAmenities: number[],
}

export type CityDistrictAction =
  |  {type: 'GET_CITY'; payload: CityType }
  |  {type: 'SET_CITY_DISTRICT'; payload:  SearchSuggestRes}
  |  {type: 'SET_TOGGLE_CHOOSE_PEOPLE'; payload: boolean }
  |  {type: 'ARRAY_RENT_TYPE'; payload: number[] }
  |  {type: 'ARRAY_AMENITIES'; payload: number[] }


const cityDistrictInitialState:CityDistrictState = {
  city_district: null,
  currCity: null,
  openChoosePeople: false,
  arrayRentType: [],
  arrayAmenities: [],
};

const cityDistrictReducer: Reducer<CityDistrictState, CityDistrictAction> = (
  state:CityDistrictState = cityDistrictInitialState,
  action:CityDistrictAction
):CityDistrictState => {
  switch (action.type) {
    case GET_CITY:
      return { ...state, currCity: action.payload };
    case SET_CITY_DISTRICT:
      return { ...state, city_district: action.payload };
    case SET_TOGGLE_CHOOSE_PEOPLE:
      return { ...state, openChoosePeople: action.payload };
    case ARRAY_RENT_TYPE:
      return { ...state, arrayRentType: action.payload };
    case ARRAY_AMENITIES:
      return { ...state, arrayAmenities: action.payload };
    default:
      return state;
  }
};

export default cityDistrictReducer;
