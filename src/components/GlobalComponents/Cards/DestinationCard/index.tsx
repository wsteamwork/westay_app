import TouchableWithScale from 'components/GlobalComponents/TouchableComponent/TouchableWithScale';
import React, {FC, memo} from 'react';
import { Alert, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-elements';
import LinearGradient from "react-native-linear-gradient";
import { SIZE_TEXT_SUBTITLE, SIZE_TEXT_TITLE_MEDIUM } from 'styles/global.style';
import { NumberRoomCity} from 'types/Rooms/RoomResponses';
import { hp, wp } from 'utils/responsive';
import {useTranslation} from 'react-i18next';
import { formatPrice} from 'utils/mixins';
import {useDispatch} from 'react-redux';
import {setSearchText, getCity} from 'store/actions/search/searchActions';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
// @ts-ignore
import { compose } from 'recompose';

interface IProps extends NavigationInjectedProps{
  item: NumberRoomCity,
}

const DestinationCard: FC<IProps> = (props) => {
  const { item, navigation } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(getCity({ id: item.city_id, type: 1 }));
    dispatch(setSearchText(item.name_city));
    navigation.navigate('ListRooms');
  };
  return (
    <TouchableWithScale
      _onPress={handleClick}
    >
      <ImageBackground
        style={styles.image}
        imageStyle={{ borderRadius: 16 }}
        resizeMode="cover"
        source={{ uri: item.image }}
      >
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.1)']}
          style={styles.linear}
        >
          <View style={styles.boxInfo}>
            <Text style={styles.name}>{item.name_city}</Text>
            <Divider style={styles.divider} />
            <Text style={styles.price}>{formatPrice(parseInt(item.average_price))} /{t('home:night')}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableWithScale>
  );
};

const styles = StyleSheet.create({
  linear: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  image: {
    position: 'relative',
    height: wp('65%'),
    width: wp('85%'),
    overflow: 'hidden',
    borderRadius: 16
  },
  name: {
    // fontSize: wp('6%'),
    fontSize: SIZE_TEXT_TITLE_MEDIUM,
    fontWeight: '700',
    color: 'white'
  },
  price: {
    fontSize: SIZE_TEXT_SUBTITLE,
    fontWeight: '500',
    color: 'white'
  },
  divider: {
    height: 2,
    backgroundColor: 'white',
    width: wp('10%'),
    borderRadius: 8,
    marginVertical: hp('1%')
  },
  boxInfo: {
    width: wp('90%'),
    height: hp('15%'),
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: wp('4%'),
    justifyContent: 'flex-end',
  }
});

export default compose(
  memo,
  withNavigation,
)(DestinationCard);
