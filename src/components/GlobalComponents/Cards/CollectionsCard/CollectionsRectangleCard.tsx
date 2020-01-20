import React, {FC, useContext} from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { LIGHT, NORMAL, SEMI_BOLD, SIZE_TEXT_CONTENT, SIZE_TEXT_SUBTITLE } from 'styles/global.style';
import { TypeApartment } from 'types/Rooms/RoomResponses';
import { hp, wp } from 'utils/responsive';
import {IMAGE_STORAGE_XS} from 'types/globalTypes';
import {AuthContext} from 'store/context/auth';
import {cleanAccents, formatPrice} from 'utils/mixins';

interface IProps {
  room: any,
  showNumberRoom?: boolean
}

const CollectionsRectangleCard: FC<IProps> = (props) => {
  const { room, showNumberRoom } = props;
  const { state} = useContext(AuthContext);
  const { languageStatus } = state;
  const handleClick = () => {
    Alert.alert('click', 'ban da click')
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
        PlaceholderContent={<ActivityIndicator />}
      />
      <Text numberOfLines={1} style={styles.titleText}>
        {room.about_room.name}
      </Text>
      <Text numberOfLines={1} style={styles.subtitleText}>
        {room.accommodation_type_txt}
        <Text style={{ fontWeight: '700' }}> &#8231; </Text>
        {languageStatus === 'en'
          ? cleanAccents(room.city)
          : room.city}
      </Text>

      {showNumberRoom && (
        <Text style={styles.contentText}>
          {room.total_area ? room.total_area : '?'} m2
          <Text style={{ fontWeight: '700' }}> &#8231; </Text>
          {room.bathrooms.number_bathroom} bathroom(s)
          <Text style={{ fontWeight: '700' }}> &#8231; </Text>
          {room.bedrooms.number_bedroom} room(s)
        </Text>
      )}

      <Text numberOfLines={1} style={styles.priceText}>
        {formatPrice(room.price_display)} /month
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('42%'),
    marginRight: 4
  },
  image: {
    height: wp('48%')
  },
  titleText: {
    fontWeight: SEMI_BOLD,
    paddingTop: hp('0.5%'),
    fontSize: SIZE_TEXT_SUBTITLE
  },
  contentText: {
    paddingTop: hp('0.5%'),
    fontSize: SIZE_TEXT_CONTENT,
    fontWeight: LIGHT
  },
  subtitleText: {
    paddingTop: hp('0.5%'),
    fontSize: SIZE_TEXT_CONTENT,
    fontWeight: LIGHT
  },
  priceText: {
    fontWeight: NORMAL,
    paddingTop: hp('0.5%'),
    fontSize: SIZE_TEXT_CONTENT
  }
});

export default CollectionsRectangleCard;
