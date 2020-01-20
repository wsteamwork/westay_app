import React, {FC, useContext, useState, Fragment, memo, useEffect} from 'react';
import {StyleSheet, View, Animated, Text, Platform} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {AuthContext} from 'store/context/auth';
import {ReducersList} from 'store/redux/reducers';
import {SearchFilterState} from 'store/redux/reducers/search/searchField';
import {CityType} from 'types/Cities/CityResponse';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import LottieView from "lottie-react-native";
import {COLOR_BACKGROUND_WHITEBLUE, wp, COLOR_BUTTON_DEFAULT, hp} from 'utils/responsive';
import IconIons from 'react-native-vector-icons/Ionicons';
// @ts-ignore
import { compose } from 'recompose';
import {getDataListRooms} from 'utils/mixins';
import RoomCard from 'components/GlobalComponents/Cards/RoomCard';
import qs from 'query-string';
import {changeDataMap} from 'components/Map/handleMap';
import {RoomIndexRes} from 'types/Rooms/RoomResponses';

interface IProps extends NavigationInjectedProps{
  paddingHeight: string,
  animatedY: any,
  onScroll: any
}

const ListRooms: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const searchField = useSelector<ReducersList, SearchFilterState>(state => state.searchField);
  const currCity = useSelector<ReducersList, CityType | null>(state => state.cityDistrict.currCity);
  const { navigation, paddingHeight, animatedY, onScroll } = props;
  const { state } = useContext(AuthContext);
  const { languageStatus } = state;
  const coords = navigation.getParam('coords');

  const [data, setData] = useState<RoomIndexRes[]>([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const getData = async (value:boolean, page = 1, url = '', findAround = false) => {
    const resData = value
      ? await getDataListRooms(
        searchField,
        currCity,
        `page=${page}`, false,
        languageStatus,
      )
      : await getDataListRooms(
        searchField,
        currCity,
        `page=${page}&${url}`,
        findAround,
        languageStatus,
      );
    const changeResData:any = changeDataMap(resData);

    value ? setData([...data, ...changeResData]) : setData([...changeResData]);
    setRefreshing(false);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
    coords ? getDataFindAround(true, page + 1) : getData(true, page + 1);
  };

  const getDataFindAround = (value = false, page = 1) => {
    const MAP_AAA = {
      lat_min: coords.latitude - 0.09 / 2,
      lat_max: coords.latitude + 0.09 / 2,
      long_min: coords.longitude - 0.09 / 2,
      long_max: coords.longitude + 0.09 / 2,
    };

    const url = qs.stringify(MAP_AAA);

    getData(value, page, url, true);
  };

  useEffect(() => {
    setRefreshing(true);

    coords ? getDataFindAround() : getData(false);
  }, [searchField, coords, languageStatus]);

  const _renderItem = (item:any, index:number)=> {
    return (
      <View style={{ marginVertical: hp('1.5%'), paddingHorizontal: wp('5%') }}>
        <RoomCard
          item={item}
          customStyle={styles.customStyle}
          imageStyle={{ height: 170 }}
        />
      </View>
    );
  };

  const handleClickMap = () => {
    coords
      ? navigation.navigate('Map', { coords })
      : navigation.navigate('Map');
  };

  return (
    <Fragment>
      {refreshing ? (
        <LottieView
          source={require('assets/lottie/loading1.json')}
          autoPlay
        />
      ) : (
        <View style={{ flex: 1, backgroundColor: COLOR_BACKGROUND_WHITEBLUE }}>
          <Animated.FlatList
            // showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            renderItem={_renderItem}
            data={data}
            keyExtractor={(item:any, index:number) => index.toString()}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={20}
            contentContainerStyle={{ paddingTop: paddingHeight }}
            scrollIndicatorInsets={{ top: paddingHeight }}
            onScroll={onScroll}
            _mustAddThis={animatedY}
            ListEmptyComponent={
              <View style={styles.viewNotFound}>
                <Text style={{ fontSize: wp('5%'), fontWeight: '700' }}>
                  {t('listRooms:noResult')}
                </Text>
              </View>
            }
          />

          <View style={styles.viewIconMap}>
            <IconIons
              name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'}
              size={wp('6%')}
              color={COLOR_BUTTON_DEFAULT}
              style={styles.iconMap}
              onPress={handleClickMap}
            />
          </View>
        </View>
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  iconMap: {
    textAlign: 'center',
    width: wp('11%'),
    height: wp('11%'),
    borderRadius: wp('11%') / 2,
    lineHeight: wp('11%'),

    backgroundColor: 'white',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  viewNotFound: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  viewIconMap: {
    position: 'absolute',
    bottom: wp('6%'),
    right: wp('6%'),
  },
  customStyle: {
    width: '100%',
    height: 310,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 1,
  },
});

export default compose(
  withNavigation,
  memo,
)(ListRooms);
