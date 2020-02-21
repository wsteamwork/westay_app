import React, { FC, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { COLOR_BUTTON_DEFAULT } from 'styles/global.style';
import { hp } from 'components/Utils/responsive.style';
import { AuthContext } from 'store/context/auth';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  datePayment: string;
  pricePayment: string;
  paymentStatus: number;
}

const BoxPaymentPeriod: FC<IProps> = (props) => {
  const { datePayment, pricePayment, paymentStatus } = props;
  const { state } = useContext(AuthContext);
  const { languageStatus } = state;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Hạn thanh toán</Text>
        <Text style={styles.date}>{datePayment}</Text>
      </View>

      {paymentStatus === 0 ? (
        <View>
          <Text style={styles.title}>
            {languageStatus === 'vi' ? 'đ' : '$'} {pricePayment}
          </Text>
          <Button
            title="Thanh toán"
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.titleStyle}
          />
        </View>
      ) : (
        <View>
          <Text style={styles.titlePayment}>
            Đã thanh toán
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    color: COLOR_BUTTON_DEFAULT,
    fontWeight: '700',
  },
  title: {
    color: '#484848',
    fontWeight: '700',
    marginBottom: hp('0.8%'),
  },
  titleStyle: {
    fontSize: 14,
    marginBottom: 3,
  },
  buttonStyle: {
    height: hp('4.5%'),
    backgroundColor: '#cc0066',
  },
  titlePayment: {
    color: COLOR_BUTTON_DEFAULT,
    fontWeight: '700',
    marginTop: hp('1.6%'),
  }
});
export default BoxPaymentPeriod;
