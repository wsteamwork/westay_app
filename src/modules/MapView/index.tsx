import React, {FC, useMemo, useContext, useRef, useState, useEffect} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {wp, hp} from 'utils/responsive';
import MapView, {LatLng, Point} from 'react-native-maps';
import {useSelector} from 'react-redux';
import {AuthContext} from 'store/context/auth';
import {
  NavigationInjectedProps,
  withNavigation,
} from 'react-navigation';
import {getDataListRooms} from 'utils/mixins';
import qs from 'query-string';
import {ReducersList} from 'store/redux/reducers';
import {SearchFilterState} from 'store/redux/reducers/search/searchField';
import {changeDataMap} from 'components/Map/handleMap';
import {RoomIndexRes, MapCoords} from 'types/Rooms/RoomResponses';
import Loadable from 'react-loadable';
import {CityType} from 'types/Cities/CityResponse';

interface IProps extends NavigationInjectedProps{

}

const ActionsMap = Loadable({
  loader: () => import('components/Map/ActionsMap'),
  loading: () => null,
});

const SwiperMap = Loadable({
  loader: () => import('components/Map/SwiperMap'),
  loading: () => null,
});

const MapMarkerFilter = Loadable({
  loader: () => import('components/Map/MapMarkerFilter'),
  loading: () => null,
});

const FindAroundHere = Loadable({
  loader: () => import('components/Map/FindAroundHere'),
  loading: () => null,
});


const MyMapView: FC<IProps> = (props) => {
  const { navigation } = props;
  const searchField = useSelector<ReducersList, SearchFilterState>((state)  => state.searchField);
  const currCity = useSelector<ReducersList, CityType | null>((state)  => state.cityDistrict.currCity);
  const coords = navigation.getParam('coords');
  const { state } = useContext(AuthContext);
  const { languageStatus } = state;
  const mapRef = useRef<any>(null);
  const [data, setData] = useState<any>([]);
  const [isIndex, setIsIndex] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [findAroundHere, setFindAroundHere] = useState<boolean>(false);
  const [latLngMinMax, setLatLngMinMax] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openLottie, setOpenLottie] = useState<boolean>(false);
  const [region, setRegion] = useState({
    latitude: 21.02,
    longitude: 105.83,
    latitudeDelta: 0.09,
    longitudeDelta: 0.09,
  });

  const getData = async (uri = '', findAround = false) => {
    setOpenLottie(true);

    const data = await getDataListRooms(
      searchField,
      currCity,
      uri,
      findAround,
      languageStatus,
    );
    setLoading(false);
    setFindAroundHere(false);
    setOpenLottie(false);

    const resData = changeDataMap(data);

    setData(resData);

    mapRef.current.animateToRegion(
      {
        ...resData[isIndex].coordinate,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      },
      600,
    );
  };

  const getDataFindAround = () => {
    const MAP_AAA = {
      lat_min: coords.latitude - 0.09 / 2,
      lat_max: coords.latitude + 0.09 / 2,
      long_min: coords.longitude - 0.09 / 2,
      long_max: coords.longitude + 0.09 / 2,
    };

    const url = qs.stringify(MAP_AAA);

    getData(url, true);
  };

  const handleChangeMap = (coord: { coordinate: LatLng; position: Point }) => {
    const MAP_AAA = {
      lat_min: coord.coordinate.latitude - region.latitudeDelta / 2,
      lat_max: coord.coordinate.latitude + region.latitudeDelta / 2,
      long_min: coord.coordinate.longitude - region.longitudeDelta / 2,
      long_max: coord.coordinate.longitude + region.longitudeDelta / 2,
    };

    setLatLngMinMax(MAP_AAA);
    setFindAroundHere(true);
  };

  const handleFindAround = async () => {
    setLoading(true);
    setIsIndex(0);
    setOpenLottie(true);

    const uri = qs.stringify(latLngMinMax);

    getData(uri, true);
  };

  const handleChangeSwiper = (index:number) => {
    setIsIndex(index);
    data.forEach((item:any, i:number) => {
      if (index === i) {
        mapRef.current.animateToRegion(
          {
            ...item.coordinate,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
          },
          600,
        );
      }
    });
  };

  useEffect(() => {
    if (coords) {
      getDataFindAround();
    } else {
      latLngMinMax ? getData(qs.stringify(latLngMinMax), true) : getData();
    }
  }, [searchField, coords, languageStatus]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent={true}
        barStyle="dark-content"
        backgroundColor="transparent"
        animated={true}
      />

      <MapView
        initialRegion={region}
        style={{ flex: 1 }}
        ref={mapRef}
        onPanDrag={({ nativeEvent }) => handleChangeMap(nativeEvent)}
      >
        {data.map((item:RoomIndexRes, index:number) => (
          <MapMarkerFilter
            key={index}
            item={item}
            isIndex={isIndex}
            setIsIndex={setIsIndex}
            index={index}
          />
        ))}
      </MapView>

      {findAroundHere && (
        <FindAroundHere loading={loading} handleFindAround={handleFindAround} />
      )}

      <View style={styles.description}>
        {useMemo(
          () => (
            <ActionsMap setOpen={setOpen} open={open} />
          ),
          [open],
        )}

        <SwiperMap
          openLottie={openLottie}
          open={open}
          handleChangeSwiper={(index)=>handleChangeSwiper(index)}
          data={data}
          isIndex={isIndex}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    position: 'absolute',
    bottom: hp('4%'),
    width: wp('100%'),
    paddingHorizontal: wp('5%'),
  },
});

export default withNavigation(MyMapView);
