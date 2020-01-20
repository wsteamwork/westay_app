import { combineReducers, Reducer } from 'redux';
import searchFieldReducer, {SearchFilterState, SearchFilterAction} from 'store/redux/reducers/search/searchField';
import cityDistrictReducer, {CityDistrictState, CityDistrictAction} from 'store/redux/reducers/search/cityDistrict';
import { LTRoomReducerState, LTRoomReducerAction, ltroomReducer } from './LTRoom/RoomDetails';
import {RoomHomepageAction, RoomHomepageState, roomHomepageReducer} from 'store/redux/reducers/Home/roomHomepage';

export type ReducersType = {
  searchField: Reducer<SearchFilterState, SearchFilterAction>;
  cityDistrict: Reducer<CityDistrictState, CityDistrictAction>;
  ltRoomDetails: Reducer<LTRoomReducerState, LTRoomReducerAction>;
  roomHomepage: Reducer<RoomHomepageState, RoomHomepageAction>;
}

export type ReducersList = {
  searchField: SearchFilterState;
  cityDistrict: CityDistrictState;
  ltRoomDetails: LTRoomReducerState;
  roomHomepage: RoomHomepageState;
};

export type ReducersActions =
  | SearchFilterAction
  | CityDistrictAction
  | LTRoomReducerAction
  | RoomHomepageAction

const reducers: ReducersType = {
  searchField: searchFieldReducer,
  cityDistrict: cityDistrictReducer,
  ltRoomDetails: ltroomReducer,
  roomHomepage: roomHomepageReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
