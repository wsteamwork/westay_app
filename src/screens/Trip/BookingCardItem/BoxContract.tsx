import React, { FC, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import IconFoundation from 'react-native-vector-icons/Foundation';
import { COLOR_BUTTON_DEFAULT, wp } from 'utils/responsive';
import ModalAllBookingContract from './ModalAllBookingContract';
import ModalCurrentContract from './ModalCurrentContract';
import ModalPaymentPeriod from './ModalPaymentPeriod';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  booking: any;
}

const BoxContract: FC<IProps> = (props) => {
  const { booking } = props;
  const [modalCurrentContract, setModalCurrentContract] = useState<boolean>(false);
  const [modalPaymentPeriod, setModalPaymentPeriod] = useState<boolean>(false);
  const [modalAllBookingContract, setModalAllBookingContract] = useState<boolean>(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.boxRow}>
        <View style={styles.boxItem}>
          <IconAntDesign name="copy1" size={wp('7%')} color={'#adadad'} style={styles.icon} />
          <View style={styles.boxDetail}>
            <Text numberOfLines={1} style={styles.title}>
              Tất cả hợp đồng
            </Text>
            <Button
              titleStyle={styles.titleStyle}
              containerStyle={styles.buttonStyle}
              title="Xem chi tiết"
              type="clear"
              iconRight
              buttonStyle={styles.buttonStyle}
              onPress={() => setModalAllBookingContract(!modalAllBookingContract)}
              icon={<Entypo style={styles.icon} name="chevron-right" size={15} color="#5388d0" />}
            />
          </View>
        </View>
        <View style={styles.boxItem}>
          <IconAntDesign name="filetext1" size={wp('7%')} color={'#adadad'} style={styles.icon} />
          <View style={styles.boxDetail}>
            <Text numberOfLines={1} style={styles.title}>
              Hợp đồng hiện tại
            </Text>
            <Button
              titleStyle={styles.titleStyle}
              containerStyle={styles.buttonStyle}
              title="Xem chi tiết"
              type="clear"
              iconRight
              buttonStyle={styles.buttonStyle}
              onPress={() => setModalCurrentContract(!modalCurrentContract)}
              icon={<Entypo style={styles.icon} name="chevron-right" size={15} color="#5388d0" />}
            />
          </View>
        </View>
      </View>
      <View style={styles.boxRow}>
        <View style={styles.boxItem}>
          <IconAntDesign name="creditcard" size={wp('7%')} color={'#adadad'} style={styles.icon} />
          <View style={styles.boxDetail}>
            <Text numberOfLines={1} style={styles.title}>
              Kỳ thanh toán
            </Text>
            <Button
              onPress={() => setModalPaymentPeriod(!modalPaymentPeriod)}
              titleStyle={styles.titleStyle}
              containerStyle={styles.buttonStyle}
              title="Xem chi tiết"
              type="clear"
              iconRight
              buttonStyle={styles.buttonStyle}
              icon={<Entypo style={styles.icon} name="chevron-right" size={15} color="#5388d0" />}
            />
          </View>
        </View>
        <View style={styles.boxItem}>
          {booking.contracts.data[0].status === 1 && (
            <IconFoundation
              name="burst-new"
              size={wp('8%')}
              color={COLOR_BUTTON_DEFAULT}
              style={styles.icon}
            />
          )}
          {booking.contracts.data[0].status !== 1 && booking.contracts.data[0].status !== 5 && (
            <IconAntDesign
              name="checkcircle"
              size={wp('7%')}
              color={COLOR_BUTTON_DEFAULT}
              style={styles.icon}
            />
          )}
          <View style={styles.boxDetail}>
            <Text numberOfLines={1} style={styles.title}>
              Trạng thái
            </Text>
            <Button
              titleStyle={styles.titleStatus}
              containerStyle={styles.buttonStyle}
              title={booking.contracts.data[0].status_txt}
              type="clear"
              iconRight
              buttonStyle={styles.buttonStyle}
            />
          </View>
        </View>
      </View>
      <ModalCurrentContract
        open={modalCurrentContract}
        setClose={setModalCurrentContract}
        booking={booking}
      />
      <ModalPaymentPeriod
        open={modalPaymentPeriod}
        setClose={setModalPaymentPeriod}
        booking={booking}
      />
      <ModalAllBookingContract
        open={modalAllBookingContract}
        setClose={setModalAllBookingContract}
        booking={booking}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  boxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  boxItem: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  boxDetail: {
    width: wp('32%'),
    marginLeft: 8,
  },
  title: {
    fontSize: 12,
    color: '#484848',
    fontWeight: '700',
  },
  buttonStyle: {
    padding: 0,
    margin: 0,
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  icon: {
    marginTop: 3,
  },
  titleStyle: {
    fontSize: 12,
    fontWeight: '700',
  },
  titleStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#484848',
  },
});
BoxContract.defaultProps = {};
export default BoxContract;
