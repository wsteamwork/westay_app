import React, { FC, useContext, useEffect, Dispatch, useState, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { NavigationInjectedProps, withNavigation, ScrollView } from 'react-navigation';
import { AuthContext } from 'store/context/auth';
import { hp, wp, COLOR_ICON_DEFAULT } from 'utils/responsive';
import { ReducersList } from 'store/redux/reducers';
import { Text, Image } from 'react-native-elements';
import ButtonOriginal from 'components/Utils/ButtonOriginal';
import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import { COLOR_TEXT_DEFAULT } from 'styles/global.style';
import {
  LTBookingAction,
  getBankList,
  redirectToBaoKim,
} from 'store/redux/reducers/LTBooking/ltbooking';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}

const BoxPaymentBaoKim: FC<IProps> = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { state } = useContext(AuthContext);
  const dispatch = useDispatch<Dispatch<LTBookingAction>>();
  const { languageStatus } = state;
  const { bankList } = useSelector<ReducersList, any>((state) => state.ltbooking);
  const [idBank, setIdBank] = useState(0);
  const [paymentPending, setPaymentPending] = useState(false);
  const dataBooking = navigation.getParam('dataBooking', null);
  useEffect(() => {
    let uuid = dataBooking.current_contract.uuid;
    getBankList(uuid, languageStatus)
      .then((res) => {
        const bankList = res.data.bank_list;
        dispatch({
          type: 'setBankList',
          payload: bankList,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [languageStatus]);

  const triggerPayment = () => {
    if (idBank !== 0) {
      setPaymentPending(true);
      redirectToBaoKim(dataBooking.current_contract.uuid, idBank, languageStatus)
        .then((res) => {
          const url = res.data;
          navigation.navigate('WebViewBaoKim', { urlToBaoKim: url });
        })
        .catch((err) => {
          setPaymentPending(false);
          Alert.alert('Rất tiếc !', 'Đơn đặt phòng này đã được tạo trên cổng thanh toán Bảo Kim');
        });
    } else {
      Alert.alert('Vui lòng chọn một hình thức thanh toán');
    }
  };
  return useMemo(
    () =>
      bankList ? (
        <View style={styles.container}>
          <View>
            <HeaderWithBackTitle handlePress={() => navigation.goBack()} />
            <Text style={styles.titleText}>Payment Method</Text>
          </View>
          <ScrollView>
            <View style={styles.background}>
              <Text
                style={{
                  fontSize: 16,
                  marginVertical: 8,
                  fontWeight: '500',
                  color: '#4b4b4b',
                }}>
                Việc thanh toán sẽ được tiến hành thông qua cổng thanh toán điện tử Bảo Kim.
              </Text>
              <Text style={styles.title}>Thanh toán qua thẻ ATM nội địa </Text>
              <View style={styles.boxInfo}>
                {bankList[0].banks.map((o: any, i: number) => (
                  <TouchableOpacity
                    style={[styles.boxImage, idBank === o.id ? styles.borderActive : null]}
                    key={i}
                    disabled={idBank === o.id}
                    onPress={() => setIdBank(o.id)}>
                    <Image
                      source={{ uri: o.logo_url }}
                      style={styles.imgBank}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.title}>Thanh toán qua thẻ quốc tế Visa, Mastercard </Text>
              <View style={styles.boxInfo}>
                {bankList[1].banks.map((o: any, i: number) => (
                  <TouchableOpacity
                    style={[styles.boxImage, idBank === o.id ? styles.borderActive : null]}
                    key={i}
                    disabled={idBank === o.id}
                    onPress={() => setIdBank(o.id)}>
                    <Image
                      source={{ uri: o.logo_url }}
                      style={styles.imgBank}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
          <View style={styles.boxButton}>
            <ButtonOriginal
              title={idBank ? 'Xác nhận và thanh toán' : 'Vui lòng chọn hình thức thanh toán'}
              disabled={!idBank || paymentPending}
              handlePress={triggerPayment}
              customStyle={styles.buttonStyle}
            />
          </View>
        </View>
      ) : (
        <Text></Text>
      ),
    [bankList, idBank],
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  titleText: {
    marginBottom: hp('3%'),
    fontWeight: 'bold',
    fontSize: wp('8%'),
    width: wp('100%'),
    paddingHorizontal: wp('5%'),
    color: COLOR_TEXT_DEFAULT,
  },
  touchable: {
    width: wp('100%'),
    height: hp('100%'),
  },
  title: {
    color: '#adadad',
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    backgroundColor: '#dfdfdf',
    marginVertical: hp('2%'),
    marginHorizontal: hp('2.2%'),
  },
  borderActive: {
    borderWidth: 2,
    borderColor: COLOR_ICON_DEFAULT,
  },
  boxButton: {
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
  background: {
    justifyContent: 'center',
    paddingHorizontal: wp('5%'),
    marginBottom: hp('15%'),
  },
  boxInfo: {
    paddingVertical: wp('2%'),
    width: wp('90%'),
    marginTop: hp('1.5%'),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  boxImage: {
    borderRadius: 1,
    elevation: 1,
    marginBottom: wp('4%'),
    padding: wp('2%'),
  },
  imgBank: {
    borderRadius: 1,
    width: wp('23%'),
    height: wp('10%'),
    borderColor: '#929292',
  },
});

export default withNavigation(BoxPaymentBaoKim);
