'use strict';
import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import Month from 'components/GlobalComponents/RangeDatepicker/Month';
import ButtonOriginal from 'components/Utils/ButtonOriginal';
import moment, { Moment } from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { COLOR_TEXT_DEFAULT } from 'styles/global.style';
import { __currentPlatform } from 'utils/mixins';
import { hp, wp } from 'utils/responsive';

interface IProps {
  horizontal?: boolean,
  showActions?: boolean,
  priceByDay?: object,
  initialMonth?: string,
  dayHeadings: string[],
  availableDates: string[],
  maxMonth?: number,
  buttonColor?: string,
  buttonContainerStyle?: object,
  startDate?: string,
  untilDate?: string,
  minDate?: string,
  maxDate?: string,
  showReset?: boolean,
  showClose?: boolean,
  ignoreMinDate?: boolean,
  onClose?: () => any,
  onSelect: (to: any, from: any) => any,
  onConfirm?: (to: any, from: any) => any,
  placeHolderStart?: string,
  placeHolderUntil?: string,
  // placeHolderClose: string,
  placeHolderReset?: string,
  selectedBackgroundColor?: string,
  selectedTextColor?: string,
  betweenSelectedColor?: string,
  todayColor?: string,
  infoText?: string,
  infoStyle?: object,
  infoContainerStyle?: object,
  days?: any
}

const RangeDatepicker: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const { selectedBackgroundColor, selectedTextColor, todayColor, betweenSelectedColor, priceByDay, maxMonth } = props;
  const [startDateState, setStartDateState] = useState<any>(props.startDate && moment(props.startDate, 'YYYYMMDD'));
  const [untilDateState, setUntilDateState] = useState<any>(props.untilDate && moment(props.untilDate, 'YYYYMMDD'));
  const [availableDatesState, setAvailableDatesState] = useState(props.availableDates || null);

  // let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  useEffect(() => {
    setAvailableDatesState(props.availableDates)
  }, [props.availableDates]);

  const onSelectDate = (date: Moment) => {
    let startDate = null;
    let untilDate = null;

    if (startDateState && !untilDateState) {
      if (
        date.format('YYYYMMDD') < startDateState.format('YYYYMMDD') ||
        isInvalidRange(date)
      ) {
        startDate = date;
      } else if (
        date.format('YYYYMMDD') > startDateState.format('YYYYMMDD')
      ) {
        startDate = startDateState;
        untilDate = date;
      } else {
        startDate = null;
        untilDate = null;
      }
    } else if (!isInvalidRange(date)) {
      startDate = date;
    } else {
      startDate = null;
      untilDate = null;
    }

    setStartDateState(startDate);
    setUntilDateState(untilDate);
    props.onSelect(startDate, untilDate);
  };

  const isInvalidRange = (date: Moment) => {
    if (availableDatesState && availableDatesState.length > 0) {
      //select endDate condition
      if (startDateState && !untilDateState) {
        for (
          let i = startDateState.format('YYYYMMDD');
          i <= date.format('YYYYMMDD');
          i = moment(i, 'YYYYMMDD')
            .add(1, 'days')
            .format('YYYYMMDD')
        ) {
          if (
            availableDatesState.indexOf(i) == -1 &&
            startDateState.format('YYYYMMDD') != i
          )
            return true;
        }
      }
      //select startDate condition
      else if (availableDatesState.indexOf(date.format('YYYYMMDD')) == -1)
        return true;
    }

    return false;
  };

  let renderMonth: any = [];

  useEffect(() => {
    let initMonth = moment();
    if (props.initialMonth && props.initialMonth != '')
      initMonth = moment(props.initialMonth, 'YYYYMM');

    // @ts-ignore
    for (let i = 0; i < maxMonth; i++) {
      renderMonth.push(
        initMonth
          .clone()
          .add(i, 'month')
          .format('YYYYMM'),
      );
    }
  }, []);

  const onReset = () => {
    setStartDateState(null);
    setUntilDateState(null);
    props.onSelect(null, null);
  };

  const handleConfirmDate = () => {
    props.onConfirm &&
      props.onConfirm(startDateState, untilDateState);
  };

  const handleRenderRow = (month: any) => {
    let availableDates = availableDatesState;

    if (availableDates && availableDates.length > 0) {
      availableDates = availableDates.filter(function (d) {
        if (d.indexOf(month) >= 0) return true;
      });
    }

    return (
      <Month
        onSelectDate={onSelectDate}
        startDate={props.startDate}
        untilDate={props.untilDate}
        availableDates={availableDates}
        minDate={props.minDate ? moment(props.minDate, 'YYYYMMDD') : props.minDate}
        maxDate={props.maxDate ? moment(props.maxDate, 'YYYYMMDD') : props.maxDate}
        ignoreMinDate={props.ignoreMinDate}
        dayProps={{
          selectedBackgroundColor,
          selectedTextColor,
          todayColor,
          betweenSelectedColor,
          priceByDay,
        }}
        month={month}
      />
    );
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        zIndex: 1000,
        // alignSelf: 'center',
        alignItems: 'center',
        paddingHorizontal: wp('5%'),
        position: 'relative'
      }}
    >
      {props.showActions && (
        <HeaderWithBackTitle
          rightComponent={
            <IonIcons
              name={__currentPlatform ? 'md-refresh' : 'ios-refresh'}
              size={wp('6%')}
              color={COLOR_TEXT_DEFAULT}
              onPress={onReset}
            />
          }
        />
      )}

      {props.showActions && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: wp('2.5%'),
            paddingBottom: 5,
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: wp('4%'),
                color: '#666',
                textTransform: 'capitalize',
              }}
            >
              {startDateState
                ? `${t('home:chooseDate:day')} ${moment(
                  startDateState,
                ).format('L')}`
                : props.placeHolderStart}
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontSize: wp('5%'),
                paddingBottom: 2,
                textAlign: 'center',
              }}
            >
              &#8594;
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: wp('4%'),
                color: '#666',
                textAlign: 'right',
                textTransform: 'capitalize',
              }}
            >
              {untilDateState
                ? `Ngày ${moment(untilDateState).format('L')}`
                : props.placeHolderUntil}
            </Text>
          </View>
        </View>
      )}

      {props.infoText != '' && (
        <View style={props.infoContainerStyle}>
          <Text style={props.infoStyle}>{props.infoText}</Text>
        </View>
      )}
      <View style={styles.dayHeader}>
        {props.dayHeadings.map((day, i) => {
          return (
            <Text
              style={{ width: wp('90%') / 7, textAlign: 'center' }}
              key={i}
            >
              {day}
            </Text>
          );
        })}
      </View>
      <View style={styles.boxList}>
        {/*<ListView*/}
        {/*  contentContainerStyle={{paddingBottom:hp('30%')}}*/}
        {/*  horizontal={props.horizontal}*/}
        {/*  dataSource={monthStack}*/}
        {/*  renderRow={handleRenderRow}*/}
        {/*  initialListSize={1}*/}
        {/*  showsVerticalScrollIndicator={false}*/}
        {/*  showsHorizontalScrollIndicator={false}*/}
        {/*/>*/}
        <FlatList
          data={renderMonth}
          renderItem={({ item }) => handleRenderRow(item)}
          initialNumToRender={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: hp('30%') }}
        />
      </View>
      {props.showActions && (
        <View style={[styles.buttonWrapper, props.buttonContainerStyle]}>
          <Text style={{ fontSize: wp('4%') }}>
            {!startDateState &&
              !untilDateState &&
              t('home:chooseDate:chooseCheckinDate')}
            {startDateState &&
              !untilDateState &&
              t('home:chooseDate:chooseCheckoutDate')}
            {startDateState &&
              untilDateState &&
              props.days &&
              `${props.days} ${t('home:chooseDate:nightSelected')}`}
          </Text>

          <ButtonOriginal width={wp('25%')} title={t('home:chooseDate:submit')} handlePress={handleConfirmDate} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dayHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 10,
  },
  buttonWrapper: {
    paddingVertical: 10,
    paddingHorizontal: wp('2.5%'),
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    top: hp('90%'),
    width: wp('100%'),
    height: hp('10%'),
    zIndex: 9999
  },
  boxList: {
    marginBottom: hp('10%'),
  }
});

RangeDatepicker.defaultProps = {
  horizontal: false,
  showActions: true,
  priceByDay: {},
  initialMonth: '',
  dayHeadings: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  maxMonth: 12,
  buttonColor: 'green',
  buttonContainerStyle: {},
  showReset: true,
  showClose: true,
  ignoreMinDate: false,
  onClose: () => { },
  onSelect: () => { },
  onConfirm: () => { },
  placeHolderStart: 'Start Date',
  placeHolderUntil: 'Until Date',
  // placeHolderClose: ' &#10005;',
  placeHolderReset: 'Xóa',
  selectedBackgroundColor: 'green',
  selectedTextColor: 'white',
  betweenSelectedColor: 'green',
  todayColor: 'green',
  startDate: undefined,
  untilDate: undefined,
  minDate: '',
  maxDate: '',
  infoText: '',
  infoStyle: { color: '#fff', fontSize: 13 },
  infoContainerStyle: {
    marginRight: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: 'green',
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
};

export default RangeDatepicker;
