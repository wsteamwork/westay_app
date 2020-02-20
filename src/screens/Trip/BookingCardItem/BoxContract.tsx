import React, { FC, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { wp, COLOR_BUTTON_DEFAULT } from 'utils/responsive';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFoundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import { Button } from 'react-native-elements';
import ModalCurrentContract from './ModalCurrentContract';
import ModalPaymentPeriod from './ModalPaymentPeriod';
import ModalAllBookingContract from './ModalAllBookingContract';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  initialProps?: any;
}

const BoxContract: FC<IProps> = (props) => {
  const [modalCurrentContract, setModalCurrentContract] = useState<boolean>(false);
  const [modalPaymentPeriod, setModalPaymentPeriod] = useState<boolean>(false);
  const [modalAllBookingContract, setModalAllBookingContract] = useState<boolean>(false);
  return (
    <View style={styles.container}>
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
          <IconFoundation
            name="burst-new"
            size={wp('8%')}
            color={COLOR_BUTTON_DEFAULT}
            style={styles.icon}
          />
          <View style={styles.boxDetail}>
            <Text numberOfLines={1} style={styles.title}>
              Trạng thái
            </Text>
            <Button
              titleStyle={styles.titleStatus}
              containerStyle={styles.buttonStyle}
              title="Đặt phòng mới"
              type="clear"
              iconRight
              buttonStyle={styles.buttonStyle}
            />
          </View>
        </View>
      </View>
      <ModalCurrentContract open={modalCurrentContract} setClose={setModalCurrentContract} />
      <ModalPaymentPeriod open={modalPaymentPeriod} setClose={setModalPaymentPeriod} />
      <ModalAllBookingContract
        open={modalAllBookingContract}
        setClose={setModalAllBookingContract}
      />
    </View>
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
