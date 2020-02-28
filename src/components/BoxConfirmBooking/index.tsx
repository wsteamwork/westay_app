import React, { FC, Dispatch, useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import ChooseGuest from 'components/ChooseGuest';
import { Divider } from 'react-native-elements';
import { hp, wp } from 'utils/responsive';
import ShowCheckinCheckout from './ShowCheckinCheckout';
import ShowPriceCalculator from './ShowPriceCalculator';
import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import ShowInfoBasicRoom from './ShowInfoBasicRoom';
import { useDispatch, useSelector } from 'react-redux';
import { LTBookingAction } from 'store/redux/reducers/LTBooking/ltbooking';
import ButtonOriginal from 'components/Utils/ButtonOriginal';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { ReducersList } from 'store/redux/reducers';
import { IMAGE_STORAGE_LG } from 'types/globalTypes';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}

const BoxConfirmBooking: FC<IProps> = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch<Dispatch<LTBookingAction>>();
  const [people, setPeople] = useState<number>(1);
  useEffect(() => {
    dispatch({ type: 'setNumberOfGuests', payload: people });
  }, [people]);
  const listing = useSelector<ReducersList, any>((state) => state.ltRoomDetails.room);
  return (
    <View style={styles.container}>
      <ScrollView>
        <HeaderWithBackTitle handlePress={() => navigation.goBack()} title="Confirm Booking" />
        <ShowInfoBasicRoom
          roomName={listing.about_room.name}
          district={listing.district.data.name}
          city={listing.city.data.name}
          image_url={`${IMAGE_STORAGE_LG + listing.avatar.images[0].name}`}
        />
        <Divider style={styles.divider} />
        <ShowCheckinCheckout />
        <Divider style={styles.divider} />
        <ChooseGuest people={people} setPeople={setPeople} />
        <Divider style={styles.divider} />
        <ShowPriceCalculator />
      </ScrollView>
      <View style={styles.BoxConfirm}>
        <ButtonOriginal
          title="Reserve"
          handlePress={() => navigation.navigate('BoxCustomerInformation')}
          customStyle={styles.buttonStyle}
        />
      </View>
    </View>
  );
};

BoxConfirmBooking.defaultProps = {};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  BoxConfirm: {
    position: 'absolute',
    bottom: 0,
    width: wp('100%'),
    height: hp('8%'),
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 10,
  },
  buttonStyle: {
    borderRadius: 5,
    elevation: 3,
  },
  titleStyle: {
    color: 'red',
    fontWeight: '500',
    marginRight: 3,
  },

  divider1: {
    backgroundColor: '#dfdfdf',
    marginHorizontal: hp('2.5%'),
  },
  divider2: {
    marginBottom: hp('2%'),
    backgroundColor: '#dfdfdf',
    marginHorizontal: hp('2.5%'),
  },
  divider: {
    backgroundColor: '#dfdfdf',
    marginVertical: hp('2%'),
    marginHorizontal: hp('2.5%'),
  },
});
export default withNavigation(BoxConfirmBooking);
