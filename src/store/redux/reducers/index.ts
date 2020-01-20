import { combineReducers, Reducer } from 'redux';
import searchFieldReducer, {SearchFilterState, SearchFilterAction} from 'store/redux/reducers/search/searchField';
import cityDistrictReducer, {CityDistrictState, CityDistrictAction} from 'store/redux/reducers/search/cityDistrict';
import { LTRoomReducerState, LTRoomReducerAction, ltroomReducer } from './LTRoom/RoomDetails';

export type ReducersType = {
  searchField: Reducer<SearchFilterState, SearchFilterAction>;
  cityDistrict: Reducer<CityDistrictState, CityDistrictAction>;
  ltRoomDetails: Reducer<LTRoomReducerState, LTRoomReducerAction>;
}

export type ReducersList = {
  searchField: SearchFilterState;
  cityDistrict: CityDistrictState;
  ltRoomDetails: LTRoomReducerState;
};

export type ReducresActions =
  | SearchFilterAction
  | CityDistrictAction
  | LTRoomReducerAction

const reducers: ReducersType = {
  searchField: searchFieldReducer,
  cityDistrict: cityDistrictReducer,
  ltRoomDetails: ltroomReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
