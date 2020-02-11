import React, { FC } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { wp } from 'utils/responsive';
import { Text } from 'react-native-elements';
import { hp } from 'components/Utils/responsive.style';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';
import { IMAGE_STORAGE_LG } from 'types/globalTypes';
import Icon from 'react-native-vector-icons/EvilIcons';
interface IProps {
  initialProps?: any;
}

const ShowInfoBasicRoom: FC<IProps> = (props) => {
  const listing = useSelector<ReducersList, any>((state) => state.ltRoomDetails.room);
  return (
    <View style={styles.container}>
      <View style={styles.boxInfo}>
        <Text numberOfLines={2} style={styles.title}>{listing.about_room.name}</Text>
        <Text style={styles.boxLocation}>
          <Icon name="location" size={18} />
          <Text>
            {listing.district.data.name}, {listing.city.data.name}
          </Text>
        </Text>
      </View>
      <Image
        borderRadius={8}
        style={styles.image}
        source={{ uri: `${IMAGE_STORAGE_LG + listing.avatar.images[0].name}` }}
        resizeMode="cover"
      />
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
    paddingRight: wp('1%')
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
