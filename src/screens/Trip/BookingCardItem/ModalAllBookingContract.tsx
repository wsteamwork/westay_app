import React, { FC, Dispatch, SetStateAction } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button, Divider } from 'react-native-elements';
import { hp, wp } from 'utils/responsive';
import Modal from 'react-native-modal';
import { elevationShadowStyle } from 'utils/mixins';
import { COLOR_BUTTON_DEFAULT } from 'styles/global.style';
import { LTBookingContracts, LTBookingIndexRes } from 'types/Booking/BookingResponses';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  open: boolean;
  setClose: Dispatch<SetStateAction<boolean>>;
  booking: any;
}

const ModalAllBookingContract: FC<IProps> = (props) => {
  const { open, setClose, booking } = props;
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
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.boxWrapper}>
            <Text style={styles.headerText}>Tất cả hợp đồng</Text>
          </View>
          {booking.contracts.data.map((con: any, i: number) => (
            <View key={i} style={[styles.containerItem, elevationShadowStyle(10)]}>
              <View style={styles.boxWrapper}>
                <Text style={styles.titleHeader}>Hợp đồng số</Text>
                <Text style={styles.itemLeft}>{i + 1}</Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.boxWrapper}>
                <Text style={styles.title}>Mã hợp đồng</Text>
                <Text style={styles.itemLeft}>#{con.uuid}</Text>
              </View>
              <View style={styles.boxWrapper}>
                <Text style={styles.title}>Ngày chuyến đến</Text>
                <Text style={styles.itemLeft}>{con.move_in.replace(/-/g, '/')}</Text>
              </View>
              <View style={styles.boxWrapper}>
                <Text style={styles.title}>Ngày chuyến đi</Text>
                <Text style={styles.itemLeft}>{con.move_out.replace(/-/g, '/')}</Text>
              </View>
              <View style={styles.boxWrapper}>
                <Text style={styles.title}>Trạng thái</Text>
                <Text style={styles.itemLeft}>{con.status_txt}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.BoxConfirm}>
          <Button
            title="Màn hình chính"
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.titleStyle}
            onPress={() => setClose(false)}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
  },
  containerItem: {
    flexDirection: 'column',
    marginVertical: hp('2%'),
    marginHorizontal: hp('3%'),
    backgroundColor: 'white',
    paddingHorizontal: hp('2%'),
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  boxWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: wp('2.5%'),
  },
  divider: {
    marginVertical: hp('2%'),
    height: 1.5,
    backgroundColor: '#efefef',
  },
  titleHeader: {
    color: COLOR_BUTTON_DEFAULT,
    fontSize: 16,
    fontWeight: '700',
  },
  title: {
    color: '#adadad',
    fontSize: 16,
    fontWeight: '500',
  },
  itemLeft: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 22,
    paddingHorizontal: hp('2.5%'),
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
  titleStyle: {
    fontSize: 14,
  },
  buttonStyle: {
    borderRadius: 5,
    width: wp('90%'),
    height: hp('6%'),
    backgroundColor: '#cc0066',
  },
});
ModalAllBookingContract.defaultProps = {};
export default ModalAllBookingContract;
