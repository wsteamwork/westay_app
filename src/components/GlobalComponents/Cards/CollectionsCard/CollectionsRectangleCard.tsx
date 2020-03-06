import React, { FC, useContext } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { AuthContext } from 'store/context/auth';
import { COLOR_TEXT_TITLE, LIGHT, NORMAL, SEMI_BOLD, SIZE_TEXT_CONTENT, SIZE_TEXT_SUBTITLE } from 'styles/global.style';
import { IMAGE_STORAGE_XS } from 'types/globalTypes';
import { cleanAccents, formatPrice } from 'utils/mixins';
import { hp, wp } from 'utils/responsive';
import {useTranslation} from 'react-i18next';

interface IProps extends NavigationInjectedProps {
  room: any,
  showNumberRoom?: boolean
}

const CollectionsRectangleCard: FC<IProps> = (props) => {
  const { room, showNumberRoom, navigation } = props;
  const { state } = useContext(AuthContext);
  const { languageStatus } = state;
  const handleClick = () => {
    navigation.navigate('DetailScreen', { idRoom: room.id });
  };
  const { t } = useTranslation();

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
        <Text style={{ fontWeight: '600' }}> &#8231; </Text>
        {languageStatus === 'en'
          ? cleanAccents(room.city)
          : room.city}
      </Text>

      {showNumberRoom && (
        <Text style={styles.contentText}>
          {room.total_area ? `${room.total_area} m2` : (null)}
          {/* <Text style={{ fontWeight: '500' }}> &#8231; </Text> */}
          {/* {room.bathrooms.number_bathroom} bathrooms */}
          <Text style={{ fontWeight: '500' }}> &#8231; </Text>
          {room.bedrooms.number_bedroom} {t('shared:bedroom')}
        </Text>
      )}

      <Text numberOfLines={1} style={styles.priceText}>
        {formatPrice(room.price_display)} /{t('shared:month')}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('40%'),
    marginRight: 4
  },
  image: {
    height: wp('44%')
  },
  titleText: {
    color: COLOR_TEXT_TITLE,
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

export default withNavigation(CollectionsRectangleCard);
