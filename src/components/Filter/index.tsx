import React, {FC, useEffect, useContext, useState, memo, useMemo} from 'react';
import { View } from 'react-native';
import {
  setInstantBook,
  setPriceDayFrom,
  setAmenities,
  setRoomType,
  setArrayAmenities, setRentType, setPriceDayTo, setArrayRentType,
} from 'store/actions/search/searchActions';
import {useTranslation} from 'react-i18next';
import {useCheckbox, getDataFilter, __currentPlatform} from 'utils/mixins';
import {AuthContext, AuthState, IAuthGlobal} from 'store/context/auth';
import {
  NavigationInjectedProps,
  withNavigation,
} from 'react-navigation';
// @ts-ignore
import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import {compose} from 'recompose';
import LoadingScreen from 'components/GlobalComponents/LoadingScreen';
import FilterByPrice from 'components/Filter/FilterByPrice';
import FilterActions from 'components/Filter/FilterActions';
import FilterAmenitiesAndRoomType from 'components/Filter/FilterAmenitiesAndRoomType';
import FilterByDateAndFastBook from 'components/Filter/FilterByDateAndFastBook';
import {wp} from 'utils/responsive';
import {COLOR_TEXT_DEFAULT} from 'styles/global.style';
import IonIcons from 'react-native-vector-icons/Ionicons';

interface IProps extends NavigationInjectedProps {
}

const Filter: FC<IProps> = (props) => {
  const { navigation } = props;

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { state: authState, dispatch:authDispatch } = useContext<IAuthGlobal>(AuthContext);
  const { languageStatus } = authState;
  const rent_type = useSelector((state:any) => state.searchField.rent_type);
  const instant_book = useSelector((state:any) => state.searchField.instant_book);
  const price_day_from = useSelector((state:any) => state.searchField.price_day_from);
  const price_day_to = useSelector((state:any) => state.searchField.price_day_to);
  const arrayRentType = useSelector((state:any) => state.cityDistrict.arrayRentType);
  const arrayAmenities = useSelector(
    (state:any) => state.cityDistrict.arrayAmenities,
  );
  const [sortByDay, setSortByDay] = useState(rent_type === 2);
  const [sortByFastBook, setSortFastBook] = useState(instant_book === 1);

  const checkPrice = () => {
    if (price_day_from && price_day_to) {
      return [price_day_from, price_day_to];
    } else if (price_day_from) {
      return [price_day_from, 50000000];
    } else if (price_day_to) {
      return [200000, price_day_to];
    } else {
      return [200000, 50000000];
    }
  };

  const [value, setValue] = useState<any[]>(checkPrice);
  const [loading, setLoading] = useState<boolean>(false);
  const [sections, setSections] = useState<any>([]);
  const [
          addDataRoomType,
          typeRoom,
          setTypeRoom,
          addDataAmenities,
          typeAmenities,
          setTypeAmenities,
        ] = useCheckbox();

  const handleReset = () => {
    setTypeRoom([]);
    setTypeAmenities([]);
    setSortByDay(false);
    setSortFastBook(false);
    setValue([200000, 50000000]);
  };

  useEffect(() => {
    arrayAmenities.length && setTypeAmenities(arrayAmenities);
    arrayRentType.length && setTypeRoom(arrayRentType);

    getDate();
  }, [languageStatus]);

  const getDate = async () => {
    setLoading(true);
    const response = await getDataFilter(languageStatus);
    setLoading(false);
    setSections(response);
  };

  const handleSubmit = () => {
    typeRoom.length
      ? dispatch(setRoomType(typeRoom.map((item:any) => item.id).join(',')))
      : dispatch(setRoomType(null));

    typeAmenities.length
      ? dispatch(setAmenities(typeAmenities.map((item:any) => item.id).join(',')))
      : dispatch(setAmenities(null));

    sortByDay ? dispatch(setRentType(2)) : dispatch(setRentType(null));

    sortByFastBook
      ? dispatch(setInstantBook(1))
      : dispatch(setInstantBook(null));

    dispatch(setPriceDayFrom(value[0]));
    dispatch(setPriceDayTo(value[1]));
    dispatch(setArrayRentType(typeRoom));
    dispatch(setArrayAmenities(typeAmenities));

    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      {/*<HeaderWithBackTitle*/}
      {/*  title={t('filter:name')}*/}
      {/*  rightComponent={*/}
      {/*    <IonIcons*/}
      {/*      name={__currentPlatform ? 'md-refresh' : 'ios-refresh'}*/}
      {/*      size={wp('6%')}*/}
      {/*      color={COLOR_TEXT_DEFAULT}*/}
      {/*      onPress={handleReset}*/}
      {/*    />*/}
      {/*  }*/}
      {/*  textHeaderStyle={{ color: COLOR_TEXT_DEFAULT }}*/}
      {/*/>*/}

      <View style={{ flex: 1, paddingHorizontal: wp('4%') }}>
        {useMemo(
          () => (
            <FilterByDateAndFastBook
              sortByDay={sortByDay}
              sortByFastBook={sortByFastBook}
              setSortByDay={setSortByDay}
              setSortFastBook={setSortFastBook}
            />
          ),
          [sortByDay, sortByFastBook],
        )}

        {useMemo(
          () => (
            <FilterByPrice value={value} setValue={setValue} />
          ),
          [value],
        )}

        {/*{useMemo(*/}
        {/*  () => (*/}
        {/*    <LoadingScreen loading={loading} />*/}
        {/*  ),*/}
        {/*  [loading],*/}
        {/*)}*/}

        {useMemo(
          () => (
            <FilterAmenitiesAndRoomType
              sections={sections}
              roomType={typeRoom}
              amenities={typeAmenities}
              addDataRoomType={addDataRoomType}
              addDataAmenities={addDataAmenities}
            />
          ),
          [sections, typeRoom, typeAmenities],
        )}

        <FilterActions handleSubmit={handleSubmit} />
      </View>
    </View>
  );
};

export default compose(
  memo,
  withNavigation,
)(Filter);
