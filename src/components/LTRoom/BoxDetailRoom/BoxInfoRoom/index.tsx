import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';
import { COLOR_TEXT_SUBTITLE, COLOR_TEXT_TITLE, SIZE_TEXT_SUBTITLE, SIZE_TEXT_TITLE } from 'styles/global.style';

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
      <Text style={styles.roomName} numberOfLines={2} lineBreakMode={'tail'}>{listing.about_room.name}</Text>
      <Text style={styles.roomNo}>Room No. {listing.room_id}</Text>
      <Text style={styles.boxLocation}>
        <Icon name="location" size={16} />{' '}
        <Text style={{ fontSize: SIZE_TEXT_SUBTITLE, color: COLOR_TEXT_TITLE }}>
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
    fontSize: SIZE_TEXT_TITLE,
    fontWeight: '600',
    color: '#484848',
    marginTop: 8,
  },
  roomNo: {
    fontSize: SIZE_TEXT_SUBTITLE,
    color: COLOR_TEXT_SUBTITLE,
    marginVertical: 6,
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
