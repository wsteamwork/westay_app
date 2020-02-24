import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { wp, hp } from 'utils/responsive';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  initialProps?: any;
}

const BoxInfoRoom: FC<IProps> = (props) => {
  const listing = useSelector<ReducersList, any>((state) => state.ltRoomDetails.room);
  return (
    <View style={styles.container}>
      <Text style={styles.roomName}>{listing.about_room.name}</Text>
      <Text style={styles.roomNo}>Room No. {listing.room_id}</Text>
      <Text style={styles.boxLocation}>
        <Icon name="location" size={18} />{' '}
        <Text>
          {listing.district.data.name}, {listing.city.data.name}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  roomName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#484848',
    marginTop: hp('1%'),
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
