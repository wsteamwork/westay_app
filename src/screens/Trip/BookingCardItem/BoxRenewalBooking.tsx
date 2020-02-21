import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { hp } from 'utils/responsive';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  initProps?: any;
}

const BoxRenewalBooking: FC<IProps> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.boxRenewal}>
        <Text style={styles.title}>
          Sắp đến ngày trả phòng, bạn có muốn tiếp tục gia hạn thêm ngày.
        </Text>
      </View>
      <View>
        <Button
          title="Gia hạn"
          buttonStyle={styles.buttonRenewStyle}
          titleStyle={styles.titleStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#484848',
    fontWeight: '700',
    marginBottom: hp('0.8%'),
  },
  boxRenewal: {
    width: '70%',
  },
  titleStyle: {
    fontSize: 14,
    marginBottom: 3,
  },
  buttonRenewStyle: {
    width: hp('11%'),
    height: hp('4.5%'),
    marginTop: hp('0.5%'),
    backgroundColor: '#ff6600',
  },
});
export default BoxRenewalBooking;
