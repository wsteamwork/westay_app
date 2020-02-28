import React, { FC } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { wp } from 'utils/responsive';
import { Text } from 'react-native-elements';
import { hp } from 'components/Utils/responsive.style';
import Icon from 'react-native-vector-icons/EvilIcons';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  initialProps?: any;
  roomName: string;
  district: string;
  city: string;
  image_url: string;
}

const ShowInfoBasicRoom: FC<IProps> = (props) => {
  const { roomName, district, city, image_url } = props;
  return (
    <View style={styles.container}>
      <View style={styles.boxInfo}>
        <Text numberOfLines={2} style={styles.title}>
          {roomName}
        </Text>
        <Text style={styles.boxLocation}>
          <Icon name="location" size={18} />
          <Text>
            {district}, {city}
          </Text>
        </Text>
      </View>
      <Image borderRadius={8} style={styles.image} source={{ uri: image_url }} resizeMode="cover" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  boxInfo: {
    width: wp('60%'),
    paddingRight: wp('1%'),
  },
  title: {
    color: '#484848',
    fontSize: 20,
    fontWeight: '700',
  },
  boxLocation: {
    position: 'relative',
    textAlignVertical: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    top: 4,
    left: -4,
  },
  address: {
    color: '#484848',
    fontSize: 14,
  },
  image: {
    marginTop: 8,
    height: hp('10%'),
    width: wp('30%'),
    borderRadius: 5,
  },
});
ShowInfoBasicRoom.defaultProps = {};
export default ShowInfoBasicRoom;
