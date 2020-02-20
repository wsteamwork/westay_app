import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import BoxInfoBasicBooking from './BoxInfoBasicBooking';
import { Divider } from 'react-native-elements';
import { hp } from 'utils/responsive';
import BoxPaymentPeriod from './BoxPaymentPeriod';
import { elevationShadowStyle } from 'utils/mixins';
import BoxContract from './BoxContract';
import { IMAGE_STORAGE_SM, IMAGE_NOT_FOUND } from 'types/globalTypes';
import moment from 'moment';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  booking: any;
  status: string[];
  bookingType: number;
}

const BookingCardItem: FC<IProps> = (props) => {
  const { booking, status, bookingType } = props;
  return (
    <View style={[styles.container, elevationShadowStyle(10)]}>
      <BoxInfoBasicBooking
        avatar={
          booking.longTermRoom &&
          booking.longTermRoom.data &&
          booking.longTermRoom.data.avatar &&
          booking.longTermRoom.data.avatar.images.length
            ? `${IMAGE_STORAGE_SM + booking.longTermRoom.data.avatar.images[0].name}`
            : IMAGE_NOT_FOUND
        }
        code={booking.code}
        checkin={moment(booking.current_contract.move_in).format('DD/MM/YYYY')}
        checkout={moment(booking.current_contract.move_out).format('DD/MM/YYYY')}
        roomName={booking.longTermRoom.data.about_room.name}
      />
      <Divider style={styles.divider} />
      <BoxPaymentPeriod />
      <Divider style={styles.divider} />
      <BoxContract />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginVertical: hp('3%'),
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    width: '93%',
  },
  divider: {
    marginVertical: hp('2.5%'),
    height: 1.5,
    backgroundColor: '#efefef',
  },
});
BookingCardItem.defaultProps = {};
export default BookingCardItem;
