import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { wp } from 'utils/responsive';
import { Avatar } from 'react-native-elements';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { COLOR_BUTTON_DEFAULT } from 'styles/global.style';
import { hp } from 'components/Utils/responsive.style';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  avatar?: string;
  code?: string;
  checkin?: string;
  checkout?: string;
  roomName?: string;
}

const BoxInfoBasicBooking: FC<IProps> = (props) => {
  const { avatar, code, checkin, checkout, roomName } = props;
  return (
    <View style={styles.container}>
      <View style={styles.boxImageRoom}>
        <Avatar
          rounded
          size="large"
          source={{
            uri:  avatar,
          }}
        />
      </View>
      <View style={styles.boxInfoBooking}>
        <Text style={styles.rowTitle}>
          <Text style={styles.label}>Mã code: </Text>
          <Text style={styles.title}>#{code} </Text>
          <IconAntDesign name="checkcircle" size={wp('3.3%')} color={COLOR_BUTTON_DEFAULT} />
        </Text>
        <Text style={styles.rowTitle}>
          <Text style={styles.label}>Ngày đến: </Text>
          <Text style={styles.title}>{checkin}</Text>
        </Text>
        <Text style={styles.rowTitle}>
          <Text style={styles.label}>Ngày đi: </Text>
          <Text style={styles.title}>{checkout}</Text>
        </Text>
        <Text style={styles.rowTitle} numberOfLines={1}>
          <Text style={styles.label}>Căn hộ: </Text>
          <Text style={styles.title}>{roomName}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  boxImageRoom: {
    width: wp('25%'),
    marginTop: 8,
  },
  boxInfoBooking: {
    width: wp('65%'),
  },
  rowTitle: {
    marginBottom: hp('0.8%'),
  },
  label: {
    color: '#adadad',
    fontWeight: '700',
  },
  title: {
    color: '#484848',
    fontWeight: '700',
  },
});
BoxInfoBasicBooking.defaultProps = {};
export default BoxInfoBasicBooking;
