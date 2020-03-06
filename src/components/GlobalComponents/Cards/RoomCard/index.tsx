import React, { FC, Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, ImageStyle, Platform, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Image } from 'react-native-elements';
import IconEntypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
// @ts-ignore
import { compose } from 'recompose';
import { COLOR_TEXT_DEFAULT, SIZE_TEXT_CONTENT, SIZE_TEXT_TITLE_FLATLIST } from 'styles/global.style';
import { elevationShadowStyle, formatPrice } from 'utils/mixins';
import { hp, wp } from 'utils/responsive';

const checkISO = Platform.OS === 'ios';

interface IProps extends NavigationInjectedProps {
  customStyle?: ViewStyle,
  room: any,
  imageStyle?: ImageStyle
}

const RoomCard: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const { room, customStyle, imageStyle, navigation } = props;
  // const { stateSaved } = useContext(SavedContext);
  // const { wishList } = stateSaved;

  // useEffect(() => {
  // }, [room]);


  const handleClick = () => {
    navigation.navigate('DetailScreen', { idRoom: room.id });
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handleClick}
      style={[styles.container, customStyle, elevationShadowStyle(0)]}
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
              uri: room.image,
            }}
            containerStyle={styles.image}
            style={[styles.image, imageStyle]}
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator />}
          />
        ),
        [room],
      )}

      {room.instant_book === 1 && (
        <View style={{ position: 'absolute', top: 5, left: 5 }}>
          <View style={styles.instant_book}>
            <FontAwesome name={'bolt'} color="#fff" size={wp('3.5%')} />
          </View>
        </View>
      )}


      <View style={styles.description}>
        <View style={{ width: '70%' }}>
          <View style={styles.item}>
            <Text style={styles.text_room_type}>{room.room_type}</Text>

            {room.number_room !== 0 && (
              <Fragment>
                <IconEntypo name="dot-single" size={wp('2%')} />

                <Text style={styles.text_room_type}>
                  {room.number_room} {t('shared:bedroom')}
                </Text>
              </Fragment>
            )}
          </View>

          <Text numberOfLines={1} style={styles.name}>
            {room.name}
          </Text>

          <View style={styles.item}>
            <IonIcons
              name={checkISO ? 'ios-pin' : 'md-pin'}
              size={wp('3.5%')}
            />
            <Text numberOfLines={1} style={styles.address}>
              {room.district_name}, {room.city_name}
            </Text>
          </View>
        </View>

        <View style={styles.boxPrice}>
          <Text style={styles.price_day} >
            {formatPrice(room.price_display)}
          </Text>

          <Text>
            /{t('shared:month')}
          </Text>
        </View>

      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#3C3D3C9d',
    borderWidth: 0.1,
    width: '100%',
    // backgroundColor: 'red',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative'
  },
  image: {
    width: '100%',
    height: hp('22%'),
    maxHeight: 185
  },
  description: {
    padding: wp('3%'),
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%'
  },
  item: { flexDirection: 'row', alignItems: 'center' },
  boxPrice: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '30%',
  },
  text_room_type: {
    textTransform: 'uppercase',
    fontSize: 11,
    color: COLOR_TEXT_DEFAULT
  },
  name: {
    fontWeight: '500',
    fontSize: SIZE_TEXT_TITLE_FLATLIST,
    color: COLOR_TEXT_DEFAULT,
    marginVertical: hp('1%')
  },
  price_day: {
    fontSize: SIZE_TEXT_TITLE_FLATLIST,
    color: COLOR_TEXT_DEFAULT,
    fontWeight: '500',
  },
  price_day_discount: {
    fontSize: wp('3%'),
    color: '#898989',
    textDecorationLine: 'line-through',
  },
  price_hour_discount: {
    fontSize: 12,
    color: '#898989',
    textDecorationLine: 'line-through',
    marginLeft: wp('3%'),
  },
  price_hour: {
    fontSize: SIZE_TEXT_TITLE_FLATLIST,
    color: '#FFA712',
    marginLeft: wp('4%'),
  },
  address: {
    fontSize: SIZE_TEXT_CONTENT,
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
