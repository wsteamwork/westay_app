import { combineReducers, Reducer } from 'redux';
import searchFieldReducer, {SearchFilterState, SearchFilterAction} from 'store/redux/reducers/search/searchField';
import cityDistrictReducer, {CityDistrictState, CityDistrictAction} from 'store/redux/reducers/search/cityDistrict';
import {RoomHomepageAction, RoomHomepageState, roomHomepageReducer} from 'store/redux/reducers/Home/roomHomepage';

export type ReducersType = {
  searchField: Reducer<SearchFilterState, SearchFilterAction>;
  cityDistrict: Reducer<CityDistrictState, CityDistrictAction>;
  roomHomepage: Reducer<RoomHomepageState, RoomHomepageAction>;
}

export type ReducersList = {
  searchField: SearchFilterState;
  cityDistrict: CityDistrictState;
  roomHomepage: RoomHomepageState;
};

export type ReducersActions =
  | SearchFilterAction
  | CityDistrictAction
  | RoomHomepageAction

const reducers: ReducersType = {
  searchField: searchFieldReducer,
  cityDistrict: cityDistrictReducer,
  roomHomepage: roomHomepageReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
