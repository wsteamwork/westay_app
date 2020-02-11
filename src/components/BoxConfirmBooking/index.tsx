import React, { FC, SetStateAction, Dispatch, useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import ChooseGuest from 'components/ChooseGuest';
import Modal from 'react-native-modal';
import { Divider } from 'react-native-elements';
import { hp, wp } from 'utils/responsive';
import ShowCheckinCheckout from './ShowCheckinCheckout';
import ShowPriceCalculator from './ShowPriceCalculator';
import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import ShowInfoBasicRoom from './ShowInfoBasicRoom';
import { useDispatch } from 'react-redux';
import { LTBookingAction } from 'store/redux/reducers/LTBooking/ltbooking';
import ButtonOriginal from 'components/Utils/ButtonOriginal';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
interface IProps extends NavigationInjectedProps {
  initialProps?: any;
  open: boolean;
  setClose: Dispatch<SetStateAction<boolean>>;
}

const BoxConfirmBooking: FC<IProps> = (props) => {
  const { navigation, open, setClose } = props;
  const dispatch = useDispatch<Dispatch<LTBookingAction>>();
  const [people, setPeople] = useState<number>(1);
  useEffect(() => {
    dispatch({ type: 'setNumberOfGuests', payload: people });
  }, [people]);
  return (
    <Modal
      isVisible={open}
      onBackButtonPress={() => setClose(false)}
      onBackdropPress={() => setClose(false)}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      coverScreen={true}
      style={{ margin: 0 }}>
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <ScrollView style={{ marginBottom: hp('10%') }}>
          <HeaderWithBackTitle handlePress={() => navigation.goBack()} title="Confirm Booking" />
          <ShowInfoBasicRoom />
          <Divider
            style={{
              backgroundColor: '#dfdfdf',
              marginTop: hp('2%'),
              marginHorizontal: hp('2.5%'),
            }}
          />
          <ShowCheckinCheckout />
          <Divider
            style={{
              backgroundColor: '#dfdfdf',
              marginBottom: hp('2%'),
              marginHorizontal: hp('2.5%'),
            }}
          />
          <ChooseGuest people={people} setPeople={setPeople} />
          <Divider
            style={{
              backgroundColor: '#dfdfdf',
              marginVertical: hp('2%'),
              marginHorizontal: hp('2.5%'),
            }}
          />
          <ShowPriceCalculator />
        </ScrollView>
      </View>
      <View style={styles.boxPrice}>
        <ButtonOriginal
          title="Reserve"
          handlePress={() => navigation.navigate('BoxCustomerInformation')}
          customStyle={styles.buttonStyle}
        />
      </View>
    </Modal>
  );
};

BoxConfirmBooking.defaultProps = {};
const styles = StyleSheet.create({
  boxPrice: {
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
});
export default withNavigation(BoxConfirmBooking);
