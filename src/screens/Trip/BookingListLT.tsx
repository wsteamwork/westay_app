import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';
import { COLOR_TEXT_DEFAULT } from 'styles/global.style';
import { IMAGE_STORAGE_SM } from 'types/globalTypes';
import { hp, wp } from 'utils/responsive';
import BookingCardItem from './BookingCardItem';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  bookingType: number;
}

const BookingListLT: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const { bookingType } = props;
  const { bookings } = useSelector<ReducersList, any>((state) => state.ltbooking);
  const _renderItem = (o: any, index: number) => {
    return (
      <View style={{ flex: 1, alignItems: 'center' }} key={index}>
        <BookingCardItem key={o.id} booking={o} bookingType={bookingType} />
      </View>
    );
  };
  const listEmptyView = () => {
    return (
      <View style={styles.emptyBooking}>
        <Image
          resizeMode="cover"
          style={{ width: wp('100%'), height: hp('50%') }}
          PlaceholderContent={<ActivityIndicator />}
          source={{ uri: `${IMAGE_STORAGE_SM + 'no_booking.jpg'}` }}
        />
        <Text style={styles.textEmpty}>{t('booking:flatListBooking:noBooking')}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={bookings}
        renderItem={({ item, index }) => _renderItem(item, index)}
        extraData={bookings}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingHorizontal: wp('2%'), paddingBottom: hp('5%'), }}
        ListEmptyComponent={listEmptyView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  boxWrapper: {
    width: '100%',
  },
  headerText: {
    padding: 10,
    marginTop: Dimensions.get('window').height / 2,
    height: 40,
  },
  emptyBooking: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textEmpty: {
    marginVertical: hp('2%'),
    fontSize: wp('4%'),
    color: COLOR_TEXT_DEFAULT,
    fontWeight: '500',
  },
});
BookingListLT.defaultProps = {};
export default BookingListLT;
