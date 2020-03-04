import ButtonOriginal from 'components/Utils/ButtonOriginal';
import React, { FC } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { PricingCard } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';
import { SIZE_TEXT_TITLE } from 'styles/global.style';
import { hp, wp } from 'utils/responsive';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}

const BoxIntroRoom: FC<IProps> = (props) => {
  const { navigation } = props;
  const listing = useSelector<ReducersList, any>((state) => state.ltRoomDetails.room);
  const NavigateToDetail = () => {
    navigation.navigate('BoxDetailRoom');
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <PricingCard
          color="rgb(84, 211, 194)"
          title={
            listing.about_room.name.length > 45
              ? `${listing.about_room.name.substr(0, 45)}...`
              : listing.about_room.name
          }
          price={`$${listing.price_display}`}
          info={[`1 Month`, `${listing.district.data.name}, ${listing.city.data.name}`]}
          button={{
            title: 'Check Availability',
            icon: '',
            buttonStyle: styles.buttonStyle,
            titleStyle: styles.buttonTitleStyle,
          }}
          containerStyle={styles.containerStyle}
          titleStyle={styles.titleStyle}
          pricingStyle={styles.pricingStyle}
          onButtonPress={() => navigation.navigate('ChooseDayBookingLT')}
        />
        <ButtonOriginal
          customStyle={{ height: 44 }}
          title="More Detail"
          iconRight={true}
          customTitleStyle={{ fontSize: 15, flex: 1, position: 'absolute' }}
          icon={
            <View
              style={{
                alignItems: 'flex-end',
                justifyContent: 'center',
                flex: 1,
                paddingHorizontal: hp('13%'),
                marginTop: 1,
              }}>
              <Icon name="chevrons-right" size={22} color="white" />
            </View>
          }
          useViewComponent={false}
          handlePress={() => navigation.navigate('BoxDetailRoom')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: hp('100%'),
    position: 'relative',
    bottom: hp('5%'),
  },
  containerStyle: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: 'white',
  },
  buttonStyle: {
    borderRadius: 360,
    width: wp('85%'),
    height: 42,
  },
  buttonTitleStyle: {
    fontSize: 15,
    fontWeight: '500',
  },
  titleStyle: {
    fontSize: SIZE_TEXT_TITLE,
  },
  pricingStyle: {
    fontSize: SIZE_TEXT_TITLE,
  },
});
BoxIntroRoom.defaultProps = {};
export default withNavigation(BoxIntroRoom);
