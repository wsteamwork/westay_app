import React, { FC, useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import BookingCardItem from './BookingCardItem';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';
import { AuthContext } from 'store/context/auth';
import { Dispatch } from 'redux';
import { LTBookingAction, getLongTermBookingList } from 'store/redux/reducers/LTBooking/ltbooking';
import { Text } from 'react-native-elements';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  status: string[];
  bookingType: number;
}

const BookingListLT: FC<IProps> = (props) => {
  const { status, bookingType } = props;
  const { state } = useContext(AuthContext);
  const { token, languageStatus } = state;
  const dispatch = useDispatch<Dispatch<LTBookingAction>>();
  const { bookings } = useSelector<ReducersList, any>((state) => state.ltbooking);
  console.log('bookings', bookings)
  useEffect(() => {
    getLongTermBookingList(token, dispatch, languageStatus, status);
  }, [status]);
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
      {bookings.length ? (
        bookings.map((o: any) => (
          <BookingCardItem key={o.id} booking={o} status={status} bookingType={bookingType} />
        ))
      ) : (
        <Text></Text>
      )}
    </ScrollView>
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
});
BookingListLT.defaultProps = {};
export default BookingListLT;
