import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { COLOR_BUTTON_DEFAULT } from 'styles/global.style';
import { hp } from 'components/Utils/responsive.style';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  initialProps?: any;
}

const BoxPaymentPeriod: FC<IProps> = (props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Hạn thanh toán</Text>
        <Text style={styles.date}>14/02/2020</Text>
      </View>
      <View>
        <Text style={styles.title}>đ 21,000,000</Text>
        <Button title="Thanh toán" buttonStyle={styles.buttonStyle} titleStyle={styles.titleStyle} />
      </View>
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
  },
  buttonStyle: {
    height: hp('4.5%'),
    backgroundColor: '#cc0066',
  },
});
export default BoxPaymentPeriod;
