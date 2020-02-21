import React, { FC, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import BoxInfoBasicBooking from './BoxInfoBasicBooking';
import { Divider } from 'react-native-elements';
import { hp } from 'utils/responsive';
import BoxPaymentPeriod from './BoxPaymentPeriod';
import { elevationShadowStyle, CURRENT, UPCOMING, FINISHED } from 'utils/mixins';
import BoxContract from './BoxContract';
import { IMAGE_STORAGE_SM, IMAGE_NOT_FOUND } from 'types/globalTypes';
import moment from 'moment';
import numeral from 'numeral';
import BoxRenewalBooking from './BoxRenewalBooking';
import BoxFinishedBooking from './BoxFinishedBooking';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  booking: any;
  bookingType: number;
}

const BookingCardItem: FC<IProps> = (props) => {
  const { booking, bookingType } = props;
  const nextPaymentDue = booking.contracts.data[0].next_payment_due;
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
        checkin={moment(booking.latest_move_in).format('DD/MM/YYYY')}
        checkout={moment(booking.latest_move_out).format('DD/MM/YYYY')}
        roomName={booking.longTermRoom.data.about_room.name}
      />
      <Divider style={styles.divider} />
      {bookingType === UPCOMING && (
        <View>
          <BoxPaymentPeriod
            datePayment={moment(nextPaymentDue.payment_due_date).format('DD/MM/YYYY')}
            pricePayment={numeral(nextPaymentDue.payment_amount).format('0,0')}
            paymentStatus={booking.contracts.data[0].payment.payment_period[0].payment_status}
          />
          <Divider style={styles.divider} />
        </View>
      )}
      {bookingType === CURRENT && nextPaymentDue && (
        <View>
          <BoxPaymentPeriod
            datePayment={moment(nextPaymentDue.payment_due_date).format('DD/MM/YYYY')}
            pricePayment={numeral(nextPaymentDue.payment_amount).format('0,0')}
            paymentStatus={nextPaymentDue.payment_status}
          />
          <Divider style={styles.divider} />
        </View>
      )}
      {bookingType === CURRENT && !nextPaymentDue && (
        <View>
          <BoxRenewalBooking />
          <Divider style={styles.divider} />
        </View>
      )}
      {bookingType === FINISHED && (
        <View>
          <BoxFinishedBooking />
          <Divider style={styles.divider} />
        </View>
      )}

      <BoxContract booking={booking} />
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
