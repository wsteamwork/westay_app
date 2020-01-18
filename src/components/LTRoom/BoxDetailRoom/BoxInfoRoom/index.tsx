import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { wp, hp } from 'utils/responsive';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/EvilIcons';

interface IProps {
  initialProps?: any;
}

const BoxInfoRoom: FC<IProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.roomName}>Indochina Color Room near Ben Thanh Market *BT402</Text>
      <Text style={styles.roomNo}>Mã chỗ ở: 3762</Text>
      <Text style={styles.boxLocation}>
        <Icon name="location" size={18} /> <Text>Quận Thanh Xuân, Hà Nội</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  roomName: {
    fontWeight: '700',
    marginTop: hp('1%'),
    fontSize: wp('5%'),
  },
  roomNo: {
    marginVertical: wp('2%'),
  },
  roomLocation: {
    marginVertical: wp('2%'),
  },
  boxLocation: {
    position: 'relative',
    textAlignVertical: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    left: -4,
  },
});
BoxInfoRoom.defaultProps = {};
export default BoxInfoRoom;
