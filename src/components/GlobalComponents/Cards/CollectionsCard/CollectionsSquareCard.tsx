import React, {FC, useContext} from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { COLOR_TEXT_SUBTITLE, NORMAL, SEMI_BOLD, SIZE_TEXT_CONTENT, SIZE_TEXT_SUBTITLE } from 'styles/global.style';
import { TypeApartment } from 'types/Rooms/RoomResponses';
import { hp, wp } from 'utils/responsive';
import {IMAGE_STORAGE_XS} from 'types/globalTypes';
import {AuthContext} from 'store/context/auth';
import {cleanAccents, formatPrice} from 'utils/mixins';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';

interface IProps extends NavigationInjectedProps{
  room: any,
  showNumberRoom?: boolean
}

const CollectionsSquareCard: FC<IProps> = (props) => {
  const { room, showNumberRoom, navigation } = props;
  const { state : {languageStatus}} = useContext(AuthContext);

  const handleClick = () => {
    navigation.navigate('DetailScreen', { idRoom: room.id });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={handleClick}
    >
      <Image
        borderRadius={8}
        source={{ uri: IMAGE_STORAGE_XS + room.avatar.images[0].name }}
        style={styles.image}
        resizeMode="cover"
        progressiveRenderingEnabled
        PlaceholderContent={<ActivityIndicator />}
      />
      <Text numberOfLines={1} style={styles.txtAddress}>
        {languageStatus === 'en' ? cleanAccents(room.district) : room.district}
        <Text style={{ fontWeight: '700' }}> &#8231; </Text>
        {languageStatus === 'en' ? cleanAccents(room.city): room.city}
      </Text>

      <Text numberOfLines={1} style={styles.txtRoomName}>
        {room.about_room.name}
      </Text>

      <Text style={styles.txtArea}>
        {room.total_area ? room.total_area : '?'} m2
        <Text style={{ fontWeight: '700' }}> &#8231; </Text>
        {room.bedrooms.number_bedroom} room(s)
      </Text>

      <Text numberOfLines={1} style={styles.priceText}>
        {formatPrice(room.price_display)} /month
      </Text>

      <Text numberOfLines={1} style={styles.txtRoomType}>
        {room.accommodation_type_txt}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('45%') - 4,
    marginBottom: hp('4%')
  },
  image: {
    height: wp('40%')
  },
  txtAddress: {
    fontSize: 11.5,
    fontWeight: NORMAL,
    paddingTop: hp('0.5%')
  },
  txtRoomName: {
    fontWeight: SEMI_BOLD,
    fontSize: SIZE_TEXT_SUBTITLE,
    paddingTop: hp('0.5%')
  },
  txtArea: {
    fontWeight: SEMI_BOLD,
    color: COLOR_TEXT_SUBTITLE,
    fontSize: SIZE_TEXT_CONTENT,
    paddingTop: hp('0.5%')
  },
  txtRoomType: {
    fontWeight: NORMAL,
    paddingTop: hp('1%'),
    fontSize: SIZE_TEXT_SUBTITLE,
    textTransform: 'uppercase',
  },
  priceText: {
    fontWeight: NORMAL,
    paddingTop: hp('0.5%'),
    fontSize: SIZE_TEXT_CONTENT
  }
});

export default withNavigation(CollectionsSquareCard);
