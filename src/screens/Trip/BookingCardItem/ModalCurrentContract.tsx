import React, { FC, Dispatch, SetStateAction, useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Divider, Button } from 'react-native-elements';
import { hp, wp } from 'utils/responsive';
import Modal from 'react-native-modal';
import { AuthContext } from 'store/context/auth';
import numeral from 'numeral';
import moment from 'moment';
/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  open: boolean;
  setClose: Dispatch<SetStateAction<boolean>>;
  booking: any;
}

const ModalCurrentContract: FC<IProps> = (props) => {
  const { open, setClose, booking } = props;
  const { state } = useContext(AuthContext);
  const { languageStatus } = state;
  const currentContract = booking.contracts.data[booking.contracts.data.length - 1];
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
            <Text style={styles.headerText}>Thông tin hợp đồng hiện tại</Text>
          </View>
          <View style={styles.boxWrapper}>
            <Text style={styles.title}>Mã hợp đồng</Text>
            <Text style={styles.itemLeft}>#{currentContract.uuid}</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.boxWrapper}>
            <Text style={styles.title}>Giá thanh toán</Text>
            <Text style={styles.itemLeft}>
              {languageStatus === 'en' ? '$' : 'đ'}{' '}
              {numeral(currentContract.price_original).format('0,0')}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.boxWrapper}>
            <Text style={styles.title}>Đặt cọc (1tháng)</Text>
            <Text style={styles.itemLeft}>
              {languageStatus === 'en' ? '$' : 'đ'}{' '}
              {numeral(currentContract.price_with_fee - currentContract.price_original).format(
                '0,0',
              )}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.boxWrapper}>
            <Text style={styles.title}>Tổng cộng</Text>
            <Text style={styles.itemLeft}>
              {languageStatus === 'en' ? '$' : 'đ'}{' '}
              {numeral(currentContract.price_with_fee).format('0,0')}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.boxWrapper}>
            <Text style={styles.title}>Số ngày</Text>
            <Text style={styles.itemLeft}>
              {currentContract.range_stay} {languageStatus === 'en' ? 'days' : 'ngày'}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.boxWrapper}>
            <Text style={styles.title}>Ngày chuyển đến</Text>
            <Text style={styles.itemLeft}>{currentContract.move_in.replace(/-/g, '/')}</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.boxWrapper}>
            <Text style={styles.title}>Ngày chuyển đi</Text>
            <Text style={styles.itemLeft}>{currentContract.move_out.replace(/-/g, '/')}</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.boxWrapper}>
            <Text style={styles.title}>Ngày đặt phòng</Text>
            <Text style={styles.itemLeft}>
              {currentContract.created_at.substring(11, 16)} -{' '}
              {moment(currentContract.created_at).format('DD/MM/YYYY')}
            </Text>
          </View>
          <Divider style={styles.divider} />
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
    paddingHorizontal: hp('2%'),
  },
  boxWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: wp('2%'),
  },
  title: {
    color: '#adadad',
    fontSize: 16,
    fontWeight: '500',
  },
  itemLeft: {
    fontSize: 16,
    fontWeight: '700',
  },
  headerText: {
    fontWeight: 'bold',
    marginBottom: 24,
    fontSize: 22,
  },
  divider: {
    marginVertical: hp('2%'),
    height: 1.5,
    backgroundColor: '#efefef',
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
ModalCurrentContract.defaultProps = {};
export default ModalCurrentContract;
