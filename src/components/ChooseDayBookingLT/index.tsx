import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import ButtonOriginal from 'components/Utils/ButtonOriginal';
import React, { Dispatch, FC, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import { Icon, Text } from 'react-native-elements';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from 'store/context/auth';
import { ReducersList } from 'store/redux/reducers';
import { LTBookingAction } from 'store/redux/reducers/LTBooking/ltbooking';
import { getRoomAvailableDate, LTRoomReducerAction } from 'store/redux/reducers/LTRoom/RoomDetails';
import { COLOR_TEXT_TITLE, SIZE_TEXT_CONTENT, SIZE_TEXT_SUBTITLE, SIZE_TEXT_TITLE_MEDIUM } from 'styles/global.style';
import { hp, wp } from 'utils/responsive';
import XDate from 'xdate';
import ShowChooseDate from './ShowChooseDate';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}

interface DateObj {
  day: number; // day of month (1-31)
  month: number; // month of year (1-12)
  year: number; // year
  timestamp: number; // UTC timestamp representing 00:00 AM of this date
  dateString: string; // date formatted as 'YYYY-MM-DD' string
}

LocaleConfig.locales['vi'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'Thg 1',
    'Thg 2',
    'Thg 3',
    'Thg 4',
    'Thg 5',
    'Thg 6',
    'Thg 7',
    'Thg 8',
    'Thg 9',
    'Thg 10',
    'Thg 11',
    'Thg 12',
  ],
  dayNames: ['Chủ Nhật', 'Thứ Hai', ' Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
  dayNamesShort: ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7'],
};
LocaleConfig.defaultLocale = 'vi';

const ChooseDayBookingLT: FC<IProps> = (props) => {
  const { navigation } = props;
  const { state } = useContext(AuthContext);
  const { t } = useTranslation();
  const { room, roomAvailable, roomId } = useSelector<ReducersList, any>(
    (state) => state.ltRoomDetails,
  );
  const { languageStatus } = state;
  const [isFromDatePicked, setIsFromDatePicked] = useState<boolean>(false);
  const [isToDatePicked, setIsToDatePicked] = useState<boolean>(false);
  const [markedDates, setMarkedDates] = useState<any>({});
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [nightSelected, setNightSelected] = useState<number>(0);
  const dispatch = useDispatch<Dispatch<LTRoomReducerAction>>();
  const dispatchBooking = useDispatch<Dispatch<LTBookingAction>>();
  const initialAvailableDate = () => {
    getRoomAvailableDate(roomId, languageStatus)
      .then((res) => dispatch({ type: 'setRoomAvailable', payload: res.move_in }))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    initialAvailableDate();
  }, []);
  const getAvailableDate = (date: string) => {
    getRoomAvailableDate(roomId, languageStatus, date)
      .then((res) => dispatch({ type: 'setRoomAvailable', payload: res.move_out }))
      .catch((err) => console.log(err));
  };

  const onDayPress = (day: DateObj) => {
    if (!isFromDatePicked || (isFromDatePicked && isToDatePicked)) {
      setToDate('');
      dispatchBooking({ type: 'setMoveOut', payload: '' });
      setupStartMarker(day);
      getAvailableDate(day.dateString);
    } else if (!isToDatePicked) {
      let oldMarkedDates = { ...markedDates };
      let [mMarkedDates, range] = setupMarkedDates(fromDate, day.dateString, oldMarkedDates);
      initialAvailableDate();
      if (range >= 0) {
        setIsFromDatePicked(true);
        setIsToDatePicked(true);
        setMarkedDates(mMarkedDates);
      } else {
        setupStartMarker(day);
      }
    }
  };
  const setupStartMarker = (day: DateObj) => {
    let newMarkedDates = {
      [day.dateString]: {
        startingDay: true,
        disabled: true,
        color: '#ff6600',
        textColor: '#ffffff',
      },
    };
    setIsFromDatePicked(true);
    setIsToDatePicked(false);
    setFromDate(day.dateString);
    setMarkedDates(newMarkedDates);
  };

  const setupMarkedDates = (fromDate: any, toDate: any, markedDates: any) => {
    let mFromDate = new XDate(fromDate);
    let mToDate = new XDate(toDate);
    let range = mFromDate.diffDays(mToDate);
    if (range >= 0) {
      if (range == 0) {
        markedDates = {
          [toDate]: {
            color: '#008489',
            selected: true,
            disabled: true,
            textColor: '#ffffff',
          },
        };
      } else {
        setNightSelected(range);
        for (var i = 1; i <= range; i++) {
          let tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd');
          if (i < range) {
            markedDates[tempDate] = {
              color: '#008489',
              selected: true,
              disabled: true,
              textColor: '#ffffff',
            };
          } else {
            setToDate(tempDate);
            markedDates[tempDate] = {
              endingDay: true,
              disabled: true,
              color: '#ff6600',
              textColor: '#ffffff',
            };
          }
        }
      }
    }
    return [markedDates, range];
  };
  const handleReset = () => {
    setIsFromDatePicked(false);
    setIsToDatePicked(false);
    setFromDate('');
    setToDate('');
    setMarkedDates({});
    initialAvailableDate();
  };

  const handleShowConfirmBooking = () => {
    dispatchBooking({ type: 'setMoveIn', payload: fromDate });
    dispatchBooking({ type: 'setMoveOut', payload: toDate });
    dispatchBooking({ type: 'setRoomId', payload: roomId });
    dispatchBooking({
      type: 'setMaxGuestRoom',
      payload: room.guests.recommendation + room.guests.max_additional_guest,
    });
    navigation.navigate('BoxConfirmBooking');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ backgroundColor: 'white', width: '100%' }}>
          <HeaderWithBackTitle
            handlePress={() => navigation.goBack()}
            rightComponent={
              fromDate ? (
                <Text
                  onPress={handleReset}
                  style={{ fontSize: SIZE_TEXT_TITLE_MEDIUM, fontWeight: '500', color: COLOR_TEXT_TITLE }}>
                  Đặt lại
              </Text>
              ) : (
                  <Text></Text>
                )
            }
            containerStyle={{ paddingHorizontal: wp('8%') }}
          />
          <ShowChooseDate fromDate={fromDate} toDate={toDate} />
        </View>

        {useMemo(
          () =>
            roomAvailable && (
              <View style={{ backgroundColor: 'white', flex: 1, marginBottom: 40 }}>
                <CalendarList
                  minDate={roomAvailable[0]}
                  maxDate={roomAvailable.slice(-1)[0]}
                  onDayPress={(day: any) => {
                    onDayPress(day);
                  }}
                  onDayLongPress={(day: any) => {
                    onDayPress(day);
                  }}
                  monthFormat={'MMMM. yyyy'}
                  hideArrows={false}
                  hideExtraDays={true}
                  disableMonthChange={true}
                  hideDayNames={false}
                  showWeekNumbers={false}
                  pastScrollRange={0}
                  futureScrollRange={24}
                  scrollEnabled={true}
                  showScrollIndicator={false}
                  markedDates={markedDates}
                  markingType={'period'}
                  theme={{
                    selectedDayBackgroundColor: '#008489',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#2d4150',
                    selectedDotColor: '#ffffff',
                    monthTextColor: '#008489',
                    textDayFontWeight: '600',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '600',
                    textDayFontSize: SIZE_TEXT_SUBTITLE,
                    textDayHeaderFontSize: SIZE_TEXT_CONTENT,
                    textMonthFontSize: SIZE_TEXT_TITLE_MEDIUM,
                    arrowColor: '#008489',
                    'stylesheet.day.period': {
                      base: {
                        overflow: 'hidden',
                        height: 30,
                        alignItems: 'center',
                        width: 30,
                      },
                    },
                  }}
                  renderArrow={(direction) => (
                    <Icon
                      name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
                      size={24}
                      color="#008489"
                    />
                  )}
                />
              </View>
            ),
          [roomAvailable, markedDates],
        )}
        <View style={styles.buttonWrapper}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontSize: SIZE_TEXT_SUBTITLE, color: COLOR_TEXT_TITLE }}>
              {!fromDate && !toDate && t('home:chooseDate:chooseCheckinDate')}
              {fromDate && !toDate && t('home:chooseDate:chooseCheckoutDate')}
              {fromDate &&
                toDate &&
                nightSelected &&
                `${nightSelected} ${t('home:chooseDate:nightSelected')}`}
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
            <ButtonOriginal
              width={wp('35%')}
              title={t('home:chooseDate:next')}
              customTitleStyle={{ fontSize: SIZE_TEXT_SUBTITLE, padding: 0 }}
              customStyle={{ backgroundColor: '#008489', height: hp('6%'), maxHeight: 34 }}
              handlePress={handleShowConfirmBooking}
              disabled={!fromDate || !toDate}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    height: 50,
    flex: 1,
    // backgroundColor: 'red',
    // height: '100%',
    // paddingVertical: 0,
    paddingHorizontal: wp('4%'),
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#ccc',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: wp('100%'),
    // height: hp('9%'),
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 3,
  },
});

export default withNavigation(ChooseDayBookingLT);
