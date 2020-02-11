import React, {
  FC,
  useState,
  useEffect,
  useReducer,
  useMemo,
  useContext,
  SyntheticEvent,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Animated,
  Keyboard,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  ScrollView,
  StyleProp,
  ViewStyle,
} from 'react-native';
import SearchInput from './SearchInput';
import { wp, hp } from 'utils/responsive';
import {
  COLOR_TEXT_SUBTITLE,
  SIZE_TEXT_TITLE_MEDIUM,
  SIZE_TEXT_CONTENT,
  COLOR_TEXT_DEFAULT,
} from 'styles/global.style';
import { SearchSuggestData, SearchSuggestRes } from 'types/Search/SearchResponse';
import TouchableWithScale from 'components/GlobalComponents/TouchableComponent/TouchableWithScale';
import ModalChooseGuest from 'components/SearchComponent/ChooseGuest/ModalChooseGuest';
import ModalChooseDate from 'components/SearchComponent/ChooseDate/ModalChooseDate';
import {
  RoomDetailContext,
  roomReducer,
  initStateRoom,
} from 'store/context/room/RoomDetailContext';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { AuthContext } from 'store/context/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ReducersList } from 'store/redux/reducers';
import {
  setCityDistrict,
  setEmptyCityDistrict,
  setSearchText,
} from 'store/actions/search/searchActions';
import SearchNotFound from './SearchNotFound';
import SectionListInput from './SectionListInput';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import InputSearchFake from 'components/SearchComponent/InputSearchFake';
import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import moment from 'moment';

interface IProps extends NavigationInjectedProps {
  showInfoGuestAndDates?: boolean;
  showListSuggest?: boolean;
  showInputFake?: boolean;
  styleContainer?: any;
}

const SearchComponent: FC<IProps> = (props) => {
  const {
    showInfoGuestAndDates,
    showListSuggest,
    showInputFake,
    styleContainer,
    navigation,
  } = props;
  const [dataSearchSuggest, setDataSearchSuggest] = useState<Array<SearchSuggestData>>([]);
  const [modalGuest, setModalGuest] = useState<boolean>(false);
  const [modalDate, setModalDate] = useState<boolean>(false);
  const [animation] = useState(new Animated.Value(0));
  const searchText = useSelector<ReducersList, string | undefined>(
    (state) => state.searchField.searchText,
  );
  const [searchTxt, setSearchTxt] = useState<string | undefined>(searchText);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { state } = useContext(AuthContext);
  const { languageStatus } = state;
  const check_in = useSelector<ReducersList, string>((state) => state.searchField.check_in);
  const check_out = useSelector<ReducersList, string>((state) => state.searchField.check_out);
  const city_district = useSelector<ReducersList, SearchSuggestRes | null>(
    (state) => state.cityDistrict.city_district,
  );
  const historySearch = useSelector<ReducersList, []>((state) => state.asyncData.historySearch);
  const number_room = useSelector<ReducersList, number>((state) => state.searchField.number_room);
  const number_guest = useSelector<ReducersList, number>((state) => state.searchField.number_guest);

  const sections = city_district && [
    {
      title: t('home:searchInput:city'),
      data: city_district.city ? city_district.city : [],
    },
    {
      title: t('home:searchInput:district'),
      data: city_district.district ? city_district.district : [],
    },
    {
      title: t('home:searchInput:accommodation'),
      data: city_district.room ? city_district.room : [],
    },
  ];

  const [stateRoom, dispatchRoomDetail] = useReducer(roomReducer, initStateRoom);

  const handleChange = (value: any) => {
    if (value) {
      dispatch(setCityDistrict(value, languageStatus));
    } else {
      setTimeout(() => {
        dispatch(setEmptyCityDistrict());
      }, 100);
    }
    setSearchTxt(value);
  };

  const onEndEditing = (e: any) => {
    if (e.nativeEvent.key === 'Enter') {
      Keyboard.dismiss();

      if (searchTxt) {
        dispatch(setSearchText(searchTxt));
        navigation.navigate('ListRooms');
      } else {
        setTimeout(() => {
          dispatch(setEmptyCityDistrict());
        }, 100);
      }
    }
  };

  return (
    <RoomDetailContext.Provider value={{ stateRoom, dispatchRoomDetail }}>
      <HeaderWithBackTitle title="Search" />

      <View style={[styles.container, styleContainer]}>
        {useMemo(
          () => (
            <View>
              {showInputFake ? (
                <InputSearchFake />
              ) : (
                <SearchInput
                  value={searchTxt}
                  _onChangeText={(value) => handleChange(value)}
                  _onKeyPress={(e) => onEndEditing(e)}
                />
              )}
            </View>
          ),
          [searchTxt],
        )}

        {showInfoGuestAndDates && (
          <View style={styles.boxInfo}>
            <TouchableWithScale style={styles.boxDate} _onPress={() => setModalDate(!modalDate)}>
              <Text style={{ color: COLOR_TEXT_SUBTITLE, fontSize: SIZE_TEXT_CONTENT }}>
                Choose Date
              </Text>
              <Text style={styles.txtDate}>
                {!check_in ? t('home:chooseDate:check_in') : moment(check_in).format('MMM DD')}
                &nbsp;-&nbsp;
                {!check_out ? t('home:chooseDate:check_out') : moment(check_out).format('MMM DD')}
              </Text>
            </TouchableWithScale>
            <View style={styles.lineVertical} />
            <TouchableWithScale style={styles.boxDate} _onPress={() => setModalGuest(!modalGuest)}>
              <Text style={{ color: COLOR_TEXT_SUBTITLE, fontSize: SIZE_TEXT_CONTENT }}>
                Number of Rooms
              </Text>
              <Text style={styles.txtDate}>
                {number_room + ' ' + t('home:choosePeople:room')}
                &nbsp;-&nbsp;
                {number_guest + ' ' + t('home:choosePeople:guest')}
              </Text>
            </TouchableWithScale>
          </View>
        )}

        {useMemo(
          () =>
            showListSuggest && (
              <View
                style={{
                  flex: 1,
                  paddingTop: hp('3%'),
                }}>
                {!city_district ? (
                  <SearchNotFound historySearch={historySearch} />
                ) : Array.isArray(city_district) && !city_district.length ? (
                  <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <IconFontAwesome5
                        name="search-location"
                        size={wp('4%')}
                        color={COLOR_TEXT_DEFAULT}
                      />
                      <Text style={styles.textNoResult}>{t('home:searchInput:noResult')}</Text>
                    </View>

                    <SearchNotFound historySearch={historySearch} />
                  </View>
                ) : (
                  <SectionListInput sections={sections} />
                )}
              </View>
            ),
          [city_district, historySearch, sections],
        )}
      </View>
      <ModalChooseGuest open={modalGuest} setClose={setModalGuest} />
      <ModalChooseDate open={modalDate} setClose={setModalDate} />
    </RoomDetailContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2%'),
    backgroundColor: '#f6f6f6',
    position: 'relative',
    flex: 1,
  },
  boxInfo: {
    flexDirection: 'row',
    marginVertical: hp('2%'),
    justifyContent: 'space-between',
  },
  lineVertical: {
    width: 1,
    height: '100%',
    backgroundColor: COLOR_TEXT_SUBTITLE,
  },
  boxDate: {
    width: '50%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  txtDate: {
    fontWeight: '700',
    fontSize: SIZE_TEXT_TITLE_MEDIUM,
  },
  textNoResult: {
    fontSize: wp('4%'),
    color: COLOR_TEXT_DEFAULT,
    fontWeight: '700',
    paddingLeft: wp('5%'),
  },
});
SearchComponent.defaultProps = {
  showInfoGuestAndDates: true,
  showListSuggest: true,
  showInputFake: false,
};
export default withNavigation(SearchComponent);
