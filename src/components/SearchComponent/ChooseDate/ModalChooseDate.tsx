import React, { FC, useContext, useState, Dispatch, SetStateAction } from 'react';
import { View, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AuthContext } from 'store/context/auth';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { COLOR_BUTTON_DEFAULT, hp } from 'utils/responsive';
import moment from 'moment';
import Loadable from 'react-loadable';
import { ReducersList } from 'store/redux/reducers';
import { RoomDetailContext } from 'store/context/room/RoomDetailContext';
import { setCheckIn, setCheckOut } from 'store/actions/search/searchActions';
import Modal from 'react-native-modal';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */


interface IProps extends NavigationInjectedProps {
  open: boolean;
  setClose: Dispatch<SetStateAction<boolean>>;
}

const RangeDatepickerJS = Loadable({
  loader: () => import('components/GlobalComponents/RangeDatepickerJS'),
  loading: () => null,
});

const ModalChooseDate: FC<IProps> = (props) => {
  const { navigation, open, setClose } = props;
  const { state } = useContext(AuthContext);
  const { languageStatus } = state;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const check_in = useSelector<ReducersList, string>((state) => state.searchField.check_in);
  const check_out = useSelector<ReducersList, string>((state) => state.searchField.check_out);
  const { stateRoom } = useContext(RoomDetailContext);
  const { roomSchedule, priceByDay } = stateRoom;
  const [days, setDays] = useState('');
  const [startDate, setStartDate] = useState<string>(check_in);
  const [untilDate, setUntilDate] = useState<string>(check_out);

  const handleConfirm = (startDate: any, untilDate: any) => {
    if (startDate) {
      setStartDate(startDate.format('YYYYMMDD'));
      dispatch(setCheckIn(startDate.format('YYYY-MM-DD HH:mm:ss')));
    }

    if (startDate && !untilDate) {
      dispatch(setCheckOut(''));
    }

    if (untilDate) {
      setUntilDate(untilDate.format('YYYYMMDD'));
      dispatch(setCheckOut(untilDate.format('YYYY-MM-DD HH:mm:ss')));
    }

    if (!startDate && !untilDate) {
      dispatch(setCheckIn(''));
      dispatch(setCheckOut(''));
    }

    navigation.goBack();
  };

  const handleSelect = (startDate: any, untilDate: any) => {
    if (startDate && untilDate) {
      const day = untilDate.diff(startDate, 'days');
      setDays(day);
    }

    if (startDate) {
      setStartDate(startDate.format('YYYYMMDD'));
    } else {
      setStartDate('');
    }

    if (untilDate) {
      setUntilDate(untilDate.format('YYYYMMDD'));
    } else {
      setUntilDate('');
    }
  };

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
      style={{ margin: 0, paddingTop: hp('9%') }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <StatusBar translucent backgroundColor="#fff" animated={true} barStyle="dark-content" />
        <RangeDatepickerJS
          startDate={startDate}
          priceByDay={priceByDay}
          untilDate={untilDate}
          dayHeadings={
            languageStatus === 'vi'
              ? ['Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7', 'CN']
              : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }
          onConfirm={handleConfirm}
          ignoreMinDate={false}
          onClose={() => navigation.goBack()}
          onSelect={handleSelect}
          placeHolderStart={t('home:chooseDate:dateCheckin')}
          placeHolderUntil={t('home:chooseDate:dateCheckout')}
          placeHolderReset={t('home:chooseDate:reset')}
          minDate={startDate ? startDate : moment().format('YYYYMMDD')}
          selectedBackgroundColor={COLOR_BUTTON_DEFAULT}
          selectedTextColor="white"
          todayColor="#FF9F1C"
          buttonColor={COLOR_BUTTON_DEFAULT}
          betweenSelectedColor="#b2efe9"
          days={days}
          availableDates={roomSchedule}
        />
      </View>
    </Modal>
  );
};

export default withNavigation(ModalChooseDate);
