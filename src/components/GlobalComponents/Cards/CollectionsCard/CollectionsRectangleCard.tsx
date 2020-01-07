import React, { FC } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { LIGHT, NORMAL, SEMI_BOLD, SIZE_TEXT_CONTENT, SIZE_TEXT_SUBTITLE } from 'styles/global.style';
import { TypeApartment } from 'types/Rooms/RoomResponses';
import { hp, wp } from 'utils/responsive';

interface IProps {
  item: TypeApartment,
  showNumberRoom?: boolean
}

const CollectionsRectangleCard: FC<IProps> = (props) => {
  const { item, showNumberRoom } = props;

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
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
        PlaceholderContent={<ActivityIndicator />}
      />
      <Text numberOfLines={1} style={styles.titleText}>
        ten phong kha la dai o day ahihi ahihi hihi haha
      </Text>
      <Text numberOfLines={1} style={styles.subtitleText}>
        Apartment
        <Text style={{ fontWeight: '700' }}> &#8231; </Text>
        Ha noi
      </Text>

      {showNumberRoom && (
        <Text style={styles.contentText}>
          30 m2
          <Text style={{ fontWeight: '700' }}> &#8231; </Text>
          1 bathroom(s)
          <Text style={{ fontWeight: '700' }}> &#8231; </Text>
          2 room(s)
        </Text>
      )}

      <Text numberOfLines={1} style={styles.priceText}>
        $900 /month
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
