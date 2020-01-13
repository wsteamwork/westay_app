import React, {useContext, useMemo, FC, } from 'react';
import {
  View,
  Text,
  Platform,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity, StyleProp, TouchableOpacityProps, ImageStyle, ImageProps, ViewStyle, TextInputProps,
} from 'react-native';
import { Image, Tooltip } from 'react-native-elements';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {
  withNavigation,
  NavigationInjectedProps,
  NavigationScreenProp,
  NavigationRoute,
  NavigationParams,
} from 'react-navigation';
import { useTranslation } from 'react-i18next';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {IMAGE_STORAGE_LG} from 'types/globalTypes';
import {COLOR_TEXT_DEFAULT} from 'styles/global.style';
import {wp, hp} from 'utils/responsive';
import {elevationShadowStyle} from 'utils/mixins';
// @ts-ignore
import {compose} from 'recompose';

const checkISO = Platform.OS === 'ios';

interface IProps extends  NavigationInjectedProps{
  customStyle?: ViewStyle,
  item?:any,
  imageStyle?: ImageStyle
}

const RoomCard: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const { item, customStyle, imageStyle, navigation } = props;
  // const { stateSaved } = useContext(SavedContext);
  // const { wishList } = stateSaved;

  // const handleClick = () => {
  //   navigation.navigate('DetailScreen', { idRoom: item.id });
  // };

  return (
    <TouchableOpacity
      activeOpacity={1}
      // onPress={handleClick}
      style={[styles.container, customStyle, elevationShadowStyle(3)]}
    >
      {/*{useMemo(*/}
      {/*  () =>*/}
      {/*    wishList.some(i:any => i.id === item.id) ? (*/}
      {/*      <RemoveHear room_id={item.id} />*/}
      {/*    ) : (*/}
      {/*      <Heart room_id={item.id} />*/}
      {/*    ),*/}
      {/*  [wishList],*/}
      {/*)}*/}

      {useMemo(
        () => (
          <Image
            source={{
              // uri: `${IMAGE_STORAGE_LG + item.image}`,
              uri: 'https://m.westay.vn/static/images/property/house.jpg',
            }}
            style={[styles.image, imageStyle]}
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator />}
          />
        ),
        [item],
      )}

      {useMemo(
        () =>
          // item.instant_book === 1 && (
          1 === 1 && (
                              <View style={{ position: 'absolute', top: 5, left: 5 }}>
                                <View style={styles.instant_book}>
                                  <FontAwesome name={'bolt'} color="#fff" size={wp('3.5%')} />
                                </View>
                              </View>
                            ),
        [item],
      )}

      {useMemo(
        () => (
          <View style={styles.description}>
            <View style={{width: '70%'}}>
              <View style={styles.item}>
                <Text style={styles.text_room_type}>can ho chung cu</Text>

                {(
                  <IconEntypo name = "dot-single" size = {wp('2%')} />
                )}
                {(
                  <Text style = {styles.text_room_type}>
                    3 {t('shared:cardRoom:bedroom')}
                  </Text>
                )}
              </View>

              <Text numberOfLines={1} style={styles.name}>
                ten rat la dai o day mamk am ams
              </Text>

              <View style={styles.item}>
                <IonIcons
                  name={checkISO ? 'ios-pin' : 'md-pin'}
                  size={wp('3.5%')}
                />
                <Text numberOfLines={1} style={styles.address}>
                  {/*{item.district_name}, {item.city_name}*/}
                  Ha noi, dong ada
                </Text>
              </View>
            </View>

              <View style={styles.boxPrice}>
                <Text style={ styles.price_day} >
                  $320
                </Text>

                <Text>
                  /{t('shared:cardRoom:night')}
                </Text>
              </View>

          </View>
        ),
        [item],
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative'
  },
  image: { width: '100%', height: hp('18%') },
  description: {
    padding: wp('3%'),
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%'
  },
  item: { flexDirection: 'row', alignItems: 'center' },
  boxPrice:{
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '30%',
  },
  text_room_type: {
    textTransform: 'uppercase',
    fontSize: wp('2.5%'),
    color: COLOR_TEXT_DEFAULT
  },
  name: {
    fontWeight: '700',
    fontSize: wp('4.5%'),
    color: COLOR_TEXT_DEFAULT,
    marginVertical: hp('1%')
  },
  price_day: {
    fontSize: wp('4.5%'),
    color: COLOR_TEXT_DEFAULT,
    fontWeight: '700',
  },
  price_day_discount: {
    fontSize: wp('3%'),
    color: '#898989',
    textDecorationLine: 'line-through',
  },
  price_hour_discount: {
    fontSize: wp('3%'),
    color: '#898989',
    textDecorationLine: 'line-through',
    marginLeft: wp('3%'),
  },
  price_hour: {
    fontSize: wp('4%'),
    color: '#FFA712',
    marginLeft: wp('4%'),
  },
  address: {
    fontSize: wp('3.5%'),
    marginLeft: wp('2%'),
    color: COLOR_TEXT_DEFAULT,
  },
  instant_book: {
    width: wp('5%'),
    height: wp('5%'),
    borderRadius: wp('2.5%'),
    margin: wp('1%'),
    backgroundColor: '#FF9800',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

RoomCard.defaultProps = {
  customStyle: {},
};

export default compose(
  withNavigation,
)(RoomCard);
