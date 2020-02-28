import React, { FC, useContext, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { COLOR_BUTTON_DEFAULT } from 'styles/global.style';
import { hp } from 'components/Utils/responsive.style';
import { AuthContext } from 'store/context/auth';
import ModalChoosePaymentMethod from './ModalChoosePaymentMethod';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  datePayment: string;
  pricePayment: string;
  paymentStatus: number;
  bookingId: number;
}

const BoxPaymentPeriod: FC<IProps> = (props) => {
  const { datePayment, pricePayment, paymentStatus, bookingId } = props;
  const { state } = useContext(AuthContext);
  const { languageStatus } = state;
  const [modalChoosePayment, setModalChoosePayment] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Thông tin thanh toán</Text>
        <Text style={styles.date}>Hạn cuối: <Text style={{color: '#cc0066', fontWeight: '400'}}>{datePayment}</Text></Text>
        <Text style={styles.date}>Giá trị: <Text style={{color: '#cc0066', fontWeight: '400'}}>{languageStatus === 'vi' ? 'đ' : '$'}{pricePayment}</Text></Text>
      </View>

      {paymentStatus === 0 ? (
        <View style={{justifyContent: 'center'}}>
          <Button
            title="Thanh toán"
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.titleStyle}
            onPress={() => setModalChoosePayment(!modalChoosePayment)}
          />
        </View>
      ) : (
        <View>
          <Text style={styles.titlePayment}>
            Đã thanh toán
          </Text>
        </View>
      )}
      <ModalChoosePaymentMethod open={modalChoosePayment} setClose={setModalChoosePayment} bookingId={bookingId}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  date: {
    // color: COLOR_BUTTON_DEFAULT,
    paddingVertical: 4,
    fontWeight: '400',
  },
  title: {
    color: '#484848',
    fontWeight: '500',
    marginBottom: 4,
  },
  titleStyle: {
    fontSize: 13,
    marginBottom: 3,
  },
  buttonStyle: {
    height: 34,
    backgroundColor: '#cc0066',
  },
  titlePayment: {
    color: COLOR_BUTTON_DEFAULT,
    fontWeight: '500',
    marginTop: hp('1.6%'),
  }
});
export default BoxPaymentPeriod;
