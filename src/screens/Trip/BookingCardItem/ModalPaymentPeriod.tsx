import React, { FC, Dispatch, SetStateAction } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button, Divider } from 'react-native-elements';
import { hp, wp } from 'utils/responsive';
import Modal from 'react-native-modal';
import { elevationShadowStyle } from 'utils/mixins';
import { COLOR_BUTTON_DEFAULT } from 'styles/global.style';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  open: boolean;
  setClose: Dispatch<SetStateAction<boolean>>;
}

const ModalPaymentPeriod: FC<IProps> = (props) => {
  const { open, setClose } = props;
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
            <Text style={styles.headerText}>Thông tin kỳ thanh toán</Text>
          </View>
          <View style={[styles.containerItem, elevationShadowStyle(10)]}>
            <View style={styles.boxWrapper}>
              <Text style={styles.titleHeader}>Kỳ thanh toán số</Text>
              <Text style={styles.itemLeft}>1</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.boxWrapper}>
              <Text style={styles.title}>Hạn thanh toán</Text>
              <Text style={styles.itemLeft}>14/02/2020</Text>
            </View>
            <View style={styles.boxWrapper}>
              <Text style={styles.title}>Cần thanh toán</Text>
              <Text style={styles.itemLeft}>đ 9,000,000</Text>
            </View>
            <View style={styles.boxWrapper}>
              <Text style={styles.title}>Trạng thái</Text>
              <Text style={styles.itemLeft}>Chưa thanh toán</Text>
            </View>
          </View>
          <View style={[styles.containerItem, elevationShadowStyle(10)]}>
            <View style={styles.boxWrapper}>
              <Text style={styles.titleHeader}>Kỳ thanh toán số</Text>
              <Text style={styles.itemLeft}>2</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.boxWrapper}>
              <Text style={styles.title}>Hạn thanh toán</Text>
              <Text style={styles.itemLeft}>14/06/2020</Text>
            </View>
            <View style={styles.boxWrapper}>
              <Text style={styles.title}>Cần thanh toán</Text>
              <Text style={styles.itemLeft}>đ 19,000,000</Text>
            </View>
            <View style={styles.boxWrapper}>
              <Text style={styles.title}>Trạng thái</Text>
              <Text style={styles.itemLeft}>Chưa thanh toán</Text>
            </View>
          </View>
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
    marginVertical: hp('3%'),
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
  divider: {
    marginVertical: hp('2%'),
    height: 1.5,
    backgroundColor: '#efefef',
  },
});
ModalPaymentPeriod.defaultProps = {};
export default ModalPaymentPeriod;
