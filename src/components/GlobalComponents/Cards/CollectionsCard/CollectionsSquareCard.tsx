import React, { FC } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { COLOR_TEXT_SUBTITLE, NORMAL, SEMI_BOLD, SIZE_TEXT_CONTENT, SIZE_TEXT_SUBTITLE } from 'styles/global.style';
import { TypeApartment } from 'types/Rooms/RoomResponses';
import { hp, wp } from 'utils/responsive';

interface IProps {
  item: TypeApartment,
  showNumberRoom?: boolean
}

const CollectionsSquareCard: FC<IProps> = (props) => {
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
        progressiveRenderingEnabled
        PlaceholderContent={<ActivityIndicator />}
      />
      <Text numberOfLines={1} style={styles.txtAddress}>
        Hoang Mai district
        <Text style={{ fontWeight: '700' }}> &#8231; </Text>
        Ha noi
      </Text>

      <Text numberOfLines={1} style={styles.txtRoomName}>
        ten phong kha la dai o day ahihi ahihi hihi haha
      </Text>

      <Text style={styles.txtArea}>
        30 m2
        <Text style={{ fontWeight: '700' }}> &#8231; </Text>
        2 room(s)
      </Text>

      <Text numberOfLines={1} style={styles.priceText}>
        $900 /month
      </Text>

      <Text numberOfLines={1} style={styles.txtRoomType}>
        APARTMENT
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

export default CollectionsSquareCard;
