import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { hp } from 'utils/responsive';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  initProps?: any;
}

const BoxFinishedBooking: FC<IProps> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.boxFinished}>
        <Text style={styles.title}>
          Cảm ơn bạn đã đặt phòng, chúng tôi hy vọng bạn đã có khoảng thời gian vui vẻ tại căn hộ !
        </Text>
      </View>

      <View>
        <Text style={styles.titleFinished}>Đã kết thúc</Text>
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
  },
  titleFinished: {
    color: 'red',
    fontWeight: '700',
    marginTop: hp('2.5%')
  },
  boxFinished: {
    width: '70%',
  },
});
export default BoxFinishedBooking;
