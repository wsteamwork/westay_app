import { combineReducers, Reducer } from 'redux';
import searchFieldReducer, {SearchFilterState, SearchFilterAction} from 'store/redux/reducers/search/searchField';
import cityDistrictReducer, {CityDistrictState, CityDistrictAction} from 'store/redux/reducers/search/cityDistrict';

export type ReducersType = {
  searchField: Reducer<SearchFilterState, SearchFilterAction>;
  cityDistrict: Reducer<CityDistrictState, CityDistrictAction>;
}

export type ReducersList = {
  searchField: SearchFilterState;
  cityDistrict: CityDistrictState;
};

export type ReducresActions =
  | SearchFilterAction
  | CityDistrictAction

const reducers: ReducersType = {
  searchField: searchFieldReducer,
  cityDistrict: cityDistrictReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
