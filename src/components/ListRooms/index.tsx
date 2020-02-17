import React, {FC, useContext, useState, Fragment, memo, useEffect} from 'react';
import {StyleSheet, View, Animated, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {AuthContext} from 'store/context/auth';
import {ReducersList} from 'store/redux/reducers';
import {SearchFilterState} from 'store/redux/reducers/search/searchField';
import {CityType} from 'types/Cities/CityResponse';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import LottieView from 'lottie-react-native';
import {wp, COLOR_BUTTON_DEFAULT, hp} from 'utils/responsive';
import Fontisto from 'react-native-vector-icons/Fontisto';
// @ts-ignore
import {compose} from 'recompose';
import {getDataListRooms, elevationShadowStyle} from 'utils/mixins';
import RoomCard from 'components/GlobalComponents/Cards/RoomCard';
import qs from 'query-string';
import {changeDataMap} from 'components/Map/handleMap';
import SearchComponent from 'components/SearchComponent';
import Feather from 'react-native-vector-icons/Feather';
import {COLOR_TITLE_HEADER} from 'styles/global.style';
import TouchableWithScale from 'components/GlobalComponents/TouchableComponent/TouchableWithScale';
import {AxiosResponse} from 'axios';
import {AxiosRes, BaseResponse} from 'types/ResponseTemplate';

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

  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [totalResult, setTotalResult] = useState<number>(0);
  const [refreshing, setRefreshing] = useState(false);

  const getData = async (value:boolean, page = 1, url = '', findAround:boolean = false) => {
    // @ts-ignore
    const resData:BaseResponse<any> = value
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
    setTotalResult(resData.data.meta.pagination.total);
    const changeResData:any = changeDataMap(resData.data.data);

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
      <View key={index} style={{ marginVertical: hp('1.5%'), paddingHorizontal: wp('5%') }}>
        <RoomCard
          room={item.item}
        />
      </View>
    );
  };

  const handleClickMap = () => {
    coords
      ? navigation.navigate('MapFilter', { coords })
      : navigation.navigate('MapFilter');
  };
  return (
    <Fragment>
      {refreshing ? (
        <LottieView
          source={require('assets/lottie/loading1.json')}
          autoPlay
        />
      ) : (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

          <SearchComponent showListSuggest={false} showInputFake={true} styleContainer={styles.containerSearch}/>

          <View style = {[styles.boxFilter, elevationShadowStyle(6)]}>
            <Text>
              {totalResult} rooms found
            </Text>
            <TouchableOpacity activeOpacity={1} onPress={()=>navigation.navigate('Filter')}>
              <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                <Text>Filter</Text>
                <Feather
                  name = {'filter'}
                  size = {wp('3.5%')}
                  style = {{marginLeft: wp('2%')}}
                  color = {COLOR_TITLE_HEADER}
                />
              </View>
            </TouchableOpacity>
          </View>

          <Animated.FlatList
            // showsVerticalScrollIndicator={false}
            style={{flex: 1 }}
            renderItem={_renderItem}
            data={data}
            keyExtractor={(item:any, index:number) => index.toString()}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={20}
            contentContainerStyle={{ paddingTop: paddingHeight, justifyContent:'center', alignItems: 'center', minHeight: '60%'  }}
            scrollIndicatorInsets={{ top: paddingHeight }}
            onScroll={onScroll}
            _mustAddThis={animatedY}
            ListEmptyComponent={
              <View style={styles.viewNotFound}>
                <Text style={{fontSize: wp('5%'), fontWeight: '700' }}>
                  {t('listRooms:noResult')}
                </Text>
              </View>
            }
          />

            <TouchableWithScale _onPress={handleClickMap} style={styles.viewIconMap}
            >
              <Fontisto
                name={'map'}
                size={wp('5%')}
                color={COLOR_BUTTON_DEFAULT}
                style={styles.iconMap}
              />
            </TouchableWithScale>
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
  viewNotFound: { justifyContent: 'center', alignItems: 'center' },
  viewIconMap: {
    position: 'absolute',
    bottom: wp('6%'),
    right: wp('6%'),
  },
  boxFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: wp('3%'),
    width: '100%',
    paddingHorizontal: wp('5%')
  },
  containerSearch:{
    flex: 0,
    paddingTop: 0
  }
});

export default compose(
  withNavigation,
  memo,
)(ListRooms);
