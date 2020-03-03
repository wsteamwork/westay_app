import React, { Dispatch, FC, SetStateAction } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Divider, Text } from 'react-native-elements';
import Modal from 'react-native-modal';
import { COLOR_BUTTON_DEFAULT } from 'styles/global.style';
import { elevationShadowStyle } from 'utils/mixins';
import { hp, wp } from 'utils/responsive';
import {useTranslation} from 'react-i18next';

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
  const { t } = useTranslation();
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
        <ScrollView stickyHeaderIndices={[0]}>
          <View style={[styles.boxWrapper, { marginTop: 42 }]}>
            <Text style={styles.headerText}>{t('booking:allContracts')}</Text>
          </View>
          {booking.contracts.data.map((con: any, i: number) => (
            <View key={i} style={[styles.containerItem, elevationShadowStyle(10)]}>
              <View style={styles.boxWrapper}>
                <Text style={styles.titleHeader}>{t('booking:Contract')}</Text>
                <Text style={styles.itemRight}>{i + 1}</Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.boxWrapper}>
                <Text style={styles.title}>{t('booking:bookingDetail:contractCode')}</Text>
                <Text style={styles.itemRight}>#{con.uuid}</Text>
              </View>
              <View style={styles.boxWrapper}>
                <Text style={styles.title}>{t('booking:bookingDetail:checkin')}</Text>
                <Text style={styles.itemRight}>{con.move_in.replace(/-/g, '/')}</Text>
              </View>
              <View style={styles.boxWrapper}>
                <Text style={styles.title}>{t('booking:bookingDetail:checkout')}</Text>
                <Text style={styles.itemRight}>{con.move_out.replace(/-/g, '/')}</Text>
              </View>
              <View style={styles.boxWrapper}>
                <Text style={styles.title}>{t('booking:state')}</Text>
                <Text style={styles.itemRight}>{con.status_txt}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.BoxConfirm}>
          <Button
            title={t('booking:bookingReview:back')}
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
    fontSize: 14,
    fontWeight: '500',
  },
  itemRight: {
    fontSize: 14,
    fontWeight: '500',
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
    height: hp('5%'),
    backgroundColor: '#cc0066',
  },
});
ModalAllBookingContract.defaultProps = {};
export default ModalAllBookingContract;
