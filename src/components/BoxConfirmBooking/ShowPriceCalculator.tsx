import { hp } from 'components/Utils/responsive.style';
import React, { Dispatch, FC, useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';
import { getLTCalculatedBookingPrice, LTBookingAction } from 'store/redux/reducers/LTBooking/ltbooking';
import { formatMoney } from 'utils/mixins';
import { wp } from 'utils/responsive';
import {useTranslation} from 'react-i18next';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */


interface IProps {
  initialProps?: any;
}

const ShowPriceCalculator: FC<IProps> = (props) => {
  const { roomId, movein, moveout, LTBookingPriceCalculate } = useSelector<ReducersList, any>(
    (state) => state.ltbooking,
  );
  const dispatch = useDispatch<Dispatch<LTBookingAction>>();
  const { t } = useTranslation();
  useEffect(() => {
    getLTCalculatedBookingPrice({
      long_term_room_id: roomId,
      move_in: movein,
      move_out: moveout,
    }).then((data) =>
      dispatch({
        type: 'setLTBookingPriceCalculate',
        payload: data,
      }),
    );
  }, []);
  return useMemo(
    () =>
      LTBookingPriceCalculate && (
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{t('booking:bookingDetail:paymentPrice')}</Text>
            <Text style={styles.date}>đ {formatMoney(LTBookingPriceCalculate.price_original)}</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>{t('booking:deposit')} (1 {t('shared:cardRoom:month')})</Text>
            <Text style={styles.date}>đ {formatMoney(LTBookingPriceCalculate.deposit)}</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.totalText}>{t('booking:total')}</Text>
            <Text style={styles.totalText}>
              đ {formatMoney(LTBookingPriceCalculate.price_with_fee)}
            </Text>
          </View>
        </View>
      ),
    [LTBookingPriceCalculate],
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  showDate: {
    flexDirection: 'row',
  },
  touchable: {
    width: wp('100%'),
    height: hp('100%'),
  },
  title: {
    color: '#adadad',
    fontSize: 16,
    fontWeight: '500',
  },
  date: {
    fontSize: 18,
    fontWeight: '500',
  },
  totalText: {
    color: '#484848',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
ShowPriceCalculator.defaultProps = {};
export default ShowPriceCalculator;
