import ButtonOriginal from 'components/Utils/ButtonOriginal';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { PricingCard } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';
import { SIZE_TEXT_TITLE } from 'styles/global.style';
import { wp } from 'utils/responsive';

interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}

const BoxIntroRoom: FC<IProps> = (props) => {
  const { navigation } = props;
  const listing = useSelector<ReducersList, any>((state) => state.ltRoomDetails.room);
  return (
    <View style={styles.container}>
      <PricingCard
        color="rgb(84, 211, 194)"
        title={listing.about_room.name.length > 45 ? `${listing.about_room.name.substr(0, 45)}...` : listing.about_room.name}
        price={`$${listing.price_display}`}
        info={['1 Month', `${listing.district.data.name}, ${listing.city.data.name}`]}
        button={{ title: 'Check Availability', icon: '', buttonStyle: styles.buttonStyle }}
        containerStyle={styles.containerStyle}
        titleStyle={styles.titleStyle}
        pricingStyle={styles.pricingStyle}
        onButtonPress={() => navigation.navigate('ChooseDayBookingLT')}
      />
      <ButtonOriginal
        customStyle={{ height: 44 }}
        title="More Detail"
        iconRight={true}
        icon={<Icon name="chevrons-down" size={18} color="white" />}
        useViewComponent={false}
        handlePress={() => navigation.navigate('BoxDetailRoom')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
    position: 'absolute',
    bottom: 30,
  },
  containerStyle: {
    borderRadius: 25,
  },
  buttonStyle: {
    borderRadius: 360,
    width: wp('85%'),
    height: 44,
  },
  titleStyle: {
    fontSize: SIZE_TEXT_TITLE + 2,
  },
  pricingStyle: {
    fontSize: SIZE_TEXT_TITLE + 2,
  },
});
BoxIntroRoom.defaultProps = {};
export default withNavigation(BoxIntroRoom);
