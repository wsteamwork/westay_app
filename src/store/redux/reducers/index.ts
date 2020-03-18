import { combineReducers, Reducer } from 'redux';
import searchFieldReducer, {SearchFilterState, SearchFilterAction} from 'store/redux/reducers/search/searchField';
import cityDistrictReducer, {CityDistrictState, CityDistrictAction} from 'store/redux/reducers/search/cityDistrict';
import { LTRoomReducerState, LTRoomReducerAction, ltroomReducer } from './LTRoom/RoomDetails';
import {RoomHomepageAction, RoomHomepageState, roomHomepageReducer} from 'store/redux/reducers/Home/roomHomepage';
import asyncStorageReducer, {AsyncStorageState, AsyncStorageAction} from 'store/redux/reducers/asyncStorage';
import { LTBookingReducerState, LTBookingAction, ltBookingReducer } from './LTBooking/ltbooking';
import {UserProfileActions, UserProfileState, userProfileReducer} from 'store/redux/reducers/Profile/userProfile';
import {
  AmenitiesReducerState,
  AmenitiesReducerAction, amenitiesReducer,
} from 'store/redux/reducers/Merchant/CreateListing/Step2/amenities';
import {
  DescriptionReducerState,
  DescriptionReducerAction, descriptionReducer,
} from 'store/redux/reducers/Merchant/CreateListing/Step2/description';

export type ReducersType = {
  searchField: Reducer<SearchFilterState, SearchFilterAction>;
  cityDistrict: Reducer<CityDistrictState, CityDistrictAction>;
  ltRoomDetails: Reducer<LTRoomReducerState, LTRoomReducerAction>;
  ltbooking: Reducer<LTBookingReducerState, LTBookingAction>;
  roomHomepage: Reducer<RoomHomepageState, RoomHomepageAction>;
  asyncData: Reducer<AsyncStorageState, AsyncStorageAction>;
  userProfile: Reducer<UserProfileState, UserProfileActions>;
  amenities: Reducer<AmenitiesReducerState, AmenitiesReducerAction>;
  description: Reducer<DescriptionReducerState, DescriptionReducerAction>;
}

export type ReducersList = {
  searchField: SearchFilterState;
  cityDistrict: CityDistrictState;
  ltRoomDetails: LTRoomReducerState;
  ltbooking: LTBookingReducerState;
  roomHomepage: RoomHomepageState;
  asyncData: AsyncStorageState;
  userProfile: UserProfileState;
  amenities: AmenitiesReducerState;
  description: DescriptionReducerState;
};

export type ReducersActions =
  | SearchFilterAction
  | CityDistrictAction
  | LTRoomReducerAction
  | RoomHomepageAction
  | LTBookingAction
  | AsyncStorageAction
  | UserProfileActions
  | AmenitiesReducerAction
  | DescriptionReducerAction

const reducers: ReducersType = {
  searchField: searchFieldReducer,
  cityDistrict: cityDistrictReducer,
  ltRoomDetails: ltroomReducer,
  ltbooking: ltBookingReducer,
  roomHomepage: roomHomepageReducer,
  asyncData: asyncStorageReducer,
  userProfile: userProfileReducer,
  amenities: amenitiesReducer,
  description: descriptionReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
