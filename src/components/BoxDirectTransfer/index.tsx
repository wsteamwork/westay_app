import React, { FC, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { NavigationInjectedProps, withNavigation, ScrollView } from 'react-navigation';
import { AuthContext } from 'store/context/auth';
import { hp, wp } from 'utils/responsive';
import { ReducersList } from 'store/redux/reducers';
import { Text, Divider } from 'react-native-elements';
import ButtonOriginal from 'components/Utils/ButtonOriginal';
import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import { COLOR_TEXT_DEFAULT, COLOR_BUTTON_DEFAULT } from 'styles/global.style';
import { formatMoney } from 'utils/mixins';

interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}

const BoxDirectTransfer: FC<IProps> = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const dataBooking = navigation.getParam('dataBooking', null);
  console.log('dataBooking', dataBooking);
  return (
    <View style={styles.container}>
      <View>
        <HeaderWithBackTitle handlePress={() => navigation.goBack()} />
        <Text style={styles.titleText}>Banking Transfer</Text>
      </View>
      <View style={styles.boxContent}>
        {dataBooking && (
          <ScrollView>
            <View style={{ borderRadius: 25 }}>
              <View style={styles.boxWrapper}>
                <Text style={styles.totalText}>Price details</Text>
              </View>
              <View style={styles.boxWrapper}>
                <Text style={styles.title}>
                  Room rate {dataBooking.current_contract.range_stay} night
                </Text>
                <Text style={styles.itemLeft}>đ {formatMoney(dataBooking.current_contract.price_original)}</Text>
              </View>
              <View style={styles.boxWrapper}>
                <Text style={styles.title}>Deposit</Text>
                <Text style={styles.itemLeft}>đ {formatMoney(dataBooking.deposit)}</Text>
              </View>
              <View style={styles.boxWrapper}>
                <Text style={styles.titleTotal}>Total revenue</Text>
                <Text style={styles.itemLeftTotal}>
                  đ {formatMoney(dataBooking.current_contract.price_with_fee)}
                </Text>
              </View>
            </View>
            <Divider style={styles.divider} />
            <View>
              <View style={styles.boxWrapper}>
                <Text style={styles.totalText}>Banking account information</Text>
              </View>
              <View style={styles.boxWrapper}>
                <Text style={styles.title}>Account number</Text>
                <Text style={styles.itemLeft}>19033679869996</Text>
              </View>
              <View style={styles.boxWrapper}>
                <Text style={styles.title}>Bank</Text>
                <Text style={styles.itemLeft}>Teckcombank</Text>
              </View>
              <View style={styles.boxWrapper}>
                <Text style={styles.title}>Branch</Text>
                <Text style={styles.itemLeft}>Hà Nội</Text>
              </View>
              <View style={styles.boxWrapper}>
                <Text style={styles.title}>Account holder</Text>
                <Text style={styles.itemLeft}>Luu Thi Linh Trang</Text>
              </View>
            </View>
            <Divider style={styles.divider} />
            <View>
              <View style={styles.boxQuestion}>
                <Text style={styles.textQuestion}>
                  Any questions please contact the phone number: 0916374057 or 0917041849
                </Text>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
      <View style={styles.boxButton}>
        <ButtonOriginal
          title="Manage Booking"
          handlePress={() => navigation.navigate('BoxManageBooking')}
          customStyle={styles.buttonStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    marginTop: hp('4%'),
  },
  boxContent: {
    padding: 8,
  },
  titleText: {
    marginBottom: hp('3%'),
    fontWeight: 'bold',
    fontSize: wp('8%'),
    width: wp('100%'),
    paddingHorizontal: wp('5%'),
    color: COLOR_TEXT_DEFAULT,
  },
  showitemLeft: {
    flexDirection: 'row',
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
  titleTotal: {
    fontSize: 16,
    color: '#484848',
    fontWeight: '700',
  },
  itemLeft: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemLeftTotal: {
    fontSize: 16,
    fontWeight: '700',
  },
  totalText: {
    color: COLOR_BUTTON_DEFAULT,
    fontWeight: 'bold',
    fontSize: 16,
  },
  boxWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: wp('2%'),
    paddingHorizontal: hp('2%'),
  },
  boxQuestion: {
    paddingVertical: wp('2%'),
    paddingHorizontal: hp('2%'),
  },
  textQuestion: {
    color: '#484848',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 23,
  },
  divider: {
    backgroundColor: '#dfdfdf',
    marginVertical: hp('2%'),
    marginHorizontal: hp('2.2%'),
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
});

export default withNavigation(BoxDirectTransfer);
