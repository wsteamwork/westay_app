import { combineReducers } from 'redux';
import searchFieldReducer from 'store/redux/reducers/search/searchField';
import cityDistrictReducer from 'store/redux/reducers/search/cityDistrict';

export default combineReducers({
  searchField: searchFieldReducer,
  cityDistrict: cityDistrictReducer,
});
