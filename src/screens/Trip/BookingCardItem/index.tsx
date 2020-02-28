import BoxRenewalBooking from 'components/BoxRenewalBooking';
import moment from 'moment';
import numeral from 'numeral';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { IMAGE_NOT_FOUND, IMAGE_STORAGE_SM } from 'types/globalTypes';
import { CURRENT, elevationShadowStyle, FINISHED, UPCOMING } from 'utils/mixins';
import { hp } from 'utils/responsive';
import BoxContract from './BoxContract';
import BoxFinishedBooking from './BoxFinishedBooking';
import BoxInfoBasicBooking from './BoxInfoBasicBooking';
import BoxInspector from './BoxInspector';
import BoxPaymentPeriod from './BoxPaymentPeriod';

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
            bookingId={booking.id}
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
            bookingId={booking.id}
          />
          <Divider style={styles.divider} />
          <BoxInspector booking={booking} />
          <Divider style={styles.divider} />
        </View>
      )}
      {bookingType === CURRENT && !nextPaymentDue && (
        <View>
          <BoxRenewalBooking
            move_in_new={booking.latest_move_out.substring(0, 10)}
            uuid={booking.uuid}
          />
          <Divider style={styles.divider} />
          <BoxInspector booking={booking} />
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
    marginTop: hp('4%'),
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    width: '98%',
  },
  divider: {
    marginVertical: 12,
    height: 1.5,
    backgroundColor: '#efefef',
  },
});
BookingCardItem.defaultProps = {};
export default BookingCardItem;
