import React, { FC, SetStateAction, useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Overlay, Button } from 'react-native-elements';
import { hp, wp } from 'utils/responsive';
import { COLOR_TEXT_DEFAULT, COLOR_TITLE_HEADER } from 'styles/global.style';
// @ts-ignore
import RadioGroup from 'react-native-radio-buttons-group';
import { COLOR_BUTTON_DEFAULT } from 'components/Utils/responsive.style';
import { getLongTermBookingById, LTBookingAction } from 'store/redux/reducers/LTBooking/ltbooking';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { AuthContext } from 'store/context/auth';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps extends NavigationInjectedProps {
  open: boolean;
  setClose: any;
  bookingId: number;
}

const ModalChoosePaymentMethod: FC<IProps> = (props) => {
  const { open, setClose, bookingId, navigation } = props;
  const { state } = useContext(AuthContext);
  const { token, languageStatus } = state;
  const dispatch = useDispatch<Dispatch<LTBookingAction>>();
  const [data, setData] = useState<any>([
    {
      label: 'Chuyển khoản trực tiếp',
      color: COLOR_TITLE_HEADER,
      selected: true,
      value: 1,
    },
    {
      label: 'Thanh toán qua Bảo Kim',
      color: COLOR_TITLE_HEADER,
      selected: false,
      value: 2,
    },
  ]);
  const onChoosePayment = (data: any) => {
    setData(data);
  };
  const handleChooseMethod = async () => {
    let selectedButton = data.find((e: any) => e.selected == true);
    let selected = selectedButton ? selectedButton.value : 1;
    try {
      const res = await getLongTermBookingById(bookingId, token, dispatch, languageStatus);
      if (res) {
        setClose(false);
        if (selected === 2) {
          navigation.navigate('BoxPaymentBaoKim', { dataBooking: res });
        } else {
          navigation.navigate('BoxDirectTransfer', { dataBooking: res });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Overlay
      isVisible={open}
      animationType={'fade'}
      onBackdropPress={() => setClose(false)}
      borderRadius={10}
      height={200}
      width={'93%'}>
      <View style={styles.container}>
        <Text style={styles.titlePayment}>Chọn một phương thức thanh toán</Text>
        <View style={styles.radioGroup}>
          <RadioGroup radioButtons={data} onPress={onChoosePayment} />
        </View>
        <View style={styles.boxButton}>
          <Button title="Tiếp tục" buttonStyle={styles.buttonStyle} onPress={handleChooseMethod} />
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titlePayment: {
    marginBottom: hp('1%'),
    fontWeight: 'bold',
    fontSize: wp('5%'),
    width: wp('100%'),
    paddingHorizontal: wp('2%'),
    color: COLOR_TEXT_DEFAULT,
  },
  radioGroup: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  boxButton: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 10,
    paddingHorizontal: wp('2%'),
  },
  buttonStyle: {
    borderRadius: 5,
    elevation: 3,
    width: hp('45%'),
    backgroundColor: COLOR_BUTTON_DEFAULT,
  },
});
ModalChoosePaymentMethod.defaultProps = {};
export default withNavigation(ModalChoosePaymentMethod);
