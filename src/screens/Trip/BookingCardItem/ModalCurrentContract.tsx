import moment from 'moment';
import numeral from 'numeral';
import React, { Dispatch, FC, SetStateAction, useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Divider, Text } from 'react-native-elements';
import Modal from 'react-native-modal';
import { AuthContext } from 'store/context/auth';
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

const ModalCurrentContract: FC<IProps> = (props) => {
  const { open, setClose, booking } = props;
  const { state } = useContext(AuthContext);
  const { languageStatus } = state;
  const currentContract = booking.contracts.data[booking.contracts.data.length - 1];
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
            <Text style={styles.headerText}>{t('booking:currentContractInformation')}</Text>
          </View>
          <View style={styles.boxWrapper}>
            <Text style={styles.title}>{t('booking:bookingDetail:contractCode')}</Text>
            <Text style={styles.itemRight}>#{currentContract.uuid}</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.boxWrapper}>
            <Text style={styles.title}>{t('booking:bookingDetail:paymentPrice')}</Text>
            <Text style={styles.itemRight}>
              {languageStatus === 'en' ? '$' : 'đ'}{' '}
              {numeral(currentContract.price_original).format('0,0')}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.boxWrapper}>
            <Text style={styles.title}>{t('booking:deposit')} (1 {t('shared:month')})</Text>
            <Text style={styles.itemRight}>
              {languageStatus === 'en' ? '$' : 'đ'}{' '}
              {numeral(currentContract.price_with_fee - currentContract.price_original).format(
                '0,0',
              )}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.boxWrapper}>
            <Text style={styles.title}>{t('booking:total')}</Text>
            <Text style={styles.itemRight}>
              {languageStatus === 'en' ? '$' : 'đ'}{' '}
              {numeral(currentContract.price_with_fee).format('0,0')}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.boxWrapper}>
            <Text style={styles.title}>{t('booking:bookingDetail:numberOfDay')}</Text>
            <Text style={styles.itemRight}>
              {currentContract.range_stay} {languageStatus === 'en' ? 'days' : 'ngày'}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.boxWrapper}>
            <Text style={styles.title}>{t('booking:bookingDetail:checkin')}</Text>
            <Text style={styles.itemRight}>{currentContract.move_in.replace(/-/g, '/')}</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.boxWrapper}>
            <Text style={styles.title}>{t('booking:bookingDetail:checkout')}</Text>
            <Text style={styles.itemRight}>{currentContract.move_out.replace(/-/g, '/')}</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.boxWrapper}>
            <Text style={styles.title}>{t('booking:bookingDetail:dateOfBooking')}</Text>
            <Text style={styles.itemRight}>
              {currentContract.created_at.substring(11, 16)} -{' '}
              {moment(currentContract.created_at).format('DD/MM/YYYY')}
            </Text>
          </View>
          <Divider style={styles.divider} />
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
    paddingHorizontal: hp('2%'),
  },
  boxWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: wp('2%'),
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
    height: hp('5%'),
    backgroundColor: '#cc0066',
  },
});
ModalCurrentContract.defaultProps = {};
export default ModalCurrentContract;
