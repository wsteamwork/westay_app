import { hp } from 'components/Utils/responsive.style';
import React, { FC, useContext } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Text } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { useSelector } from 'react-redux';
import { AuthContext } from 'store/context/auth';
import { ReducersList } from 'store/redux/reducers';
import { formatDateBooking } from 'utils/mixins';
import { wp } from 'utils/responsive';
import {useTranslation} from 'react-i18next';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}

const ShowCheckinCheckout: FC<IProps> = (props) => {
  const { navigation } = props;
  const { state } = useContext(AuthContext);
  const { languageStatus } = state;
  const { movein, moveout } = useSelector<ReducersList, any>((state) => state.ltbooking);
  const { t } = useTranslation();
  return (
    <View>
      <TouchableWithoutFeedback style={styles.touchable} onPress={() => navigation.navigate('ChooseDayBookingLT')}>
        <View style={styles.container}>
          <Text style={styles.title}>{t("booking:date")}</Text>
          <View style={styles.showDate}>
            <Text style={styles.date}>
              {formatDateBooking(movein, languageStatus)} - {formatDateBooking(moveout, languageStatus)}
            </Text>
            <Entypo name="chevron-right" size={25} color="#484848" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    // paddingVertical: 4
  },
  showDate: {
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
    marginRight: wp('5%'),
  },
  date: {
    fontSize: 18,
    fontWeight: '500',
    marginRight: wp('5%'),
  },
});
ShowCheckinCheckout.defaultProps = {};
export default withNavigation(ShowCheckinCheckout);
