import React, { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { wp, hp } from 'utils/responsive';
import { PricingCard } from 'react-native-elements';
import ButtonOriginal from 'components/Utils/ButtonOriginal';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';

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
        title="More details"
        iconRight={true}
        icon={<Icon name="chevrons-down" size={19} color="white" />}
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
    borderRadius: 25,
    width: wp('85%'),
    height: hp('7%'),
  },
  titleStyle: {
    fontSize: wp('6%'),
  },
  pricingStyle: {
    fontSize: wp('8%'),
  },
});
BoxIntroRoom.defaultProps = {};
export default withNavigation(BoxIntroRoom);
