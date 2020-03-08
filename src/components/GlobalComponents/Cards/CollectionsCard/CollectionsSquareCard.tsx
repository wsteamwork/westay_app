import React, { FC, useContext } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Image, normalize } from 'react-native-elements';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { AuthContext } from 'store/context/auth';
import { COLOR_TEXT_SUBTITLE, NORMAL, SEMI_BOLD, SIZE_TEXT_CONTENT, SIZE_TEXT_SUBTITLE, LIGHT, COLOR_TEXT_TITLE } from 'styles/global.style';
import { IMAGE_STORAGE_XS } from 'types/globalTypes';
import { cleanAccents, formatPrice } from 'utils/mixins';
import { hp, wp } from 'utils/responsive';
import {useTranslation} from 'react-i18next';

interface IProps extends NavigationInjectedProps {
  showNumberRoom?: boolean
  avatar: string
  district: string
  city: string
  name: string
  total_area: number | null
  number_bedroom: string | number
  price_display?: number | null
  accommodation_type_txt?: string | number
  idRoom: number
}

const CollectionsSquareCard: FC<IProps> = (props) => {
  const { showNumberRoom, avatar, name, accommodation_type_txt, city , district, price_display, number_bedroom, total_area, idRoom, navigation } = props;
  const { state: { languageStatus } } = useContext(AuthContext);
  const { t } = useTranslation();

  const handleClick = () => {
    navigation.navigate('DetailScreen', { idRoom: idRoom });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={handleClick}
    >
      <Image
        borderRadius={8}
        source={{ uri: IMAGE_STORAGE_XS + avatar }}
        style={styles.image}
        resizeMode="cover"
        progressiveRenderingEnabled
        PlaceholderContent={<ActivityIndicator />}
      />
      <Text numberOfLines={1} style={styles.txtAddress}>
        {languageStatus === 'en' ? cleanAccents(district) : district}
        <Text style={{ fontWeight: '500' }}> &#8231; </Text>
        {languageStatus === 'en' ? cleanAccents(city) : city}
      </Text>

      <Text numberOfLines={1} style={styles.txtRoomName}>
        {name}
      </Text>

      <Text style={styles.txtArea}>
        {total_area ? `${total_area} m2` : (null)}
        <Text style={{ fontWeight: '500' }}> &#8231; </Text>
        {number_bedroom} {t('shared:bedroom')}
      </Text>

      {/* <Text numberOfLines={1} style={styles.priceText}>
        {formatPrice(price_display)} /month
      </Text> */}

      {/* <Text numberOfLines={1} style={styles.txtRoomType}>
        {accommodation_type_txt}
      </Text> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('45%') - 4,
    marginBottom: 13
  },
  image: {
    height: wp('41%')
  },
  txtAddress: {
    alignSelf: 'flex-start',
    fontSize: 12,
    fontWeight: LIGHT,
    color: COLOR_TEXT_TITLE,
    paddingTop: 4,
  },
  txtRoomName: {
    fontWeight: NORMAL,
    fontSize: SIZE_TEXT_SUBTITLE,
    paddingTop: 4
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
