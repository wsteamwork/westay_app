import React, { FC, useState, useContext } from 'react';
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
import {useTranslation} from 'react-i18next';

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
  const { t } = useTranslation();
  const dispatch = useDispatch<Dispatch<LTBookingAction>>();
  const [data, setData] = useState<any>([
    {
      label: t('booking:bankingTransfer'),
      color: COLOR_TITLE_HEADER,
      selected: true,
      value: 1,
    },
    {
      label: t('booking:paymentThroughBaoKim'),
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
        <Text style={styles.titlePayment}>{t('booking:chooseAPaymentMethod')}</Text>
        <View style={styles.radioGroup}>
          <RadioGroup radioButtons={data} onPress={onChoosePayment} />
        </View>
        <View>
          <Button title={t('shared:next')} buttonStyle={styles.buttonStyle} onPress={handleChooseMethod} />
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

  },
  buttonStyle: {
    borderRadius: 5,
    marginTop: hp('5%'),
    elevation: 3,
    width: '100%',
    backgroundColor: COLOR_BUTTON_DEFAULT,
  },
});
ModalChoosePaymentMethod.defaultProps = {};
export default withNavigation(ModalChoosePaymentMethod);
