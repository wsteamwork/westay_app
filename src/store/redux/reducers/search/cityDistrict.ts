import {
  ARRAY_AMENITIES,
  GET_CITY,
  ARRAY_RENT_TYPE,
  SET_CITY_DISTRICT,
  SET_TOGGLE_CHOOSE_PEOPLE,
} from 'types/Search/searchTypes';

const cityDistrictInitialState = {
  city_district: null,
  currCity: null,
  openChoosePeople: false,
  arrayRentType: [],
  arrayAmenities: [],
};

const cityDistrictReducer = (state = cityDistrictInitialState, action:any) => {
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
