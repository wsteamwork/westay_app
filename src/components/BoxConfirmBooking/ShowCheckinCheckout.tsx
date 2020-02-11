import React, { FC, useState, useContext } from 'react';
import { StyleSheet, View, TouchableNativeFeedback } from 'react-native';
import { wp } from 'utils/responsive';
import { Text } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import { hp } from 'components/Utils/responsive.style';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';
import ChooseDayBookingLT from 'components/ChooseDayBookingLT';
import { formatDateBooking } from 'utils/mixins';
import { AuthContext } from 'store/context/auth';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}

const ShowCheckinCheckout: FC<IProps> = (props) => {
  const { navigation } = props;
  const { state } = useContext(AuthContext);
  const { languageStatus } = state;
  const { movein, moveout } = useSelector<ReducersList, any>((state) => state.ltbooking);
  const [chooseDate, setChooseDate] = useState<boolean>(false);
  return (
    <View>
      <TouchableNativeFeedback style={styles.touchable} onPress={() => setChooseDate(!chooseDate)}>
        <View style={styles.container}>
          <Text style={styles.title}>Date</Text>
          <View style={styles.showDate}>
            <Text style={styles.date}>
              {formatDateBooking(movein, languageStatus)} -{' '}
              {formatDateBooking(moveout, languageStatus)}
            </Text>
            <Entypo name="chevron-right" size={25} color="#484848" />
          </View>
        </View>
      </TouchableNativeFeedback>
      <ChooseDayBookingLT open={chooseDate} setClose={setChooseDate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingVertical: hp('4%'),
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
