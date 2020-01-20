'use strict';
import React, {FC, useEffect, memo} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import moment from 'moment';
import DayRow from 'components/GlobalComponents/RangeDatepicker/DayRow';
// @ts-ignore
import {compose} from 'recompose';

interface IProps {
  minDate: any,
  maxDate: any,
  availableDates: any,
  startDate: any,
  untilDate: any,
  ignoreMinDate: any,
  month: any,
  dayProps: any,
  onSelectDate: any,
}

const Month: FC<IProps> = (props) => {
  const { startDate,
          untilDate,
          availableDates,
          minDate,
          maxDate,
          ignoreMinDate,
          month, dayProps , onSelectDate
        } = props;




  const getDayStack=(month:any)=> {
    let currMonth = moment(month).month(); //get this month
    let currDate = moment(month).startOf('month'); //get first day in this month

    let dayColumn = [];
    let dayRow = [];
    let dayObject: any = {};


    do {
      dayColumn = [];
      for (let i = 0; i < 7; i++) {
        dayObject = {
          type: null,
          date: null,
        };
        if (i == currDate.days() && currDate.month() == currMonth) {
          if (
            minDate &&
            minDate.format('YYYYMMDD') &&
            currDate.format('YYYYMMDD') < minDate.format('YYYYMMDD')
          ) {
            if (
              startDate &&
              startDate.format('YYYYMMDD') > currDate.format('YYYYMMDD') &&
              currDate.format('YYYYMMDD') > moment().format('YYYYMMDD') &&
              ignoreMinDate
            ) {
            } else {
              dayObject.type = 'disabled';
            }
          }
          if (
            maxDate &&
            maxDate.format('YYYYMMDD') &&
            currDate.format('YYYYMMDD') > maxDate.format('YYYYMMDD')
          ) {
            dayObject.type = 'disabled';
          }
          if (
            availableDates &&
            availableDates.indexOf(currDate.format('YYYYMMDD')) == -1
          ) {
            dayObject.type = 'blockout';
          }
          if (
            startDate &&
            startDate.format('YYYYMMDD') == currDate.format('YYYYMMDD')
          ) {
            if (!untilDate) dayObject.type = 'single';
            else {
              dayObject.type = 'first';
            }
          }
          if (
            untilDate &&
            untilDate.format('YYYYMMDD') == currDate.format('YYYYMMDD')
          ) {
            dayObject.type = 'last';
          }
          if (
            startDate &&
            startDate.format('YYYYMMDD') < currDate.format('YYYYMMDD') &&
            (untilDate &&
            untilDate.format('YYYYMMDD') > currDate.format('YYYYMMDD'))
          )
            dayObject.type = 'between';

          dayObject.date = currDate.clone().format('YYYYMMDD');
          dayColumn.push(dayObject);
          currDate.add(1, 'day');
        } else {
          if (
            startDate &&
            untilDate &&
            (startDate.format('YYYYMMDD') < currDate.format('YYYYMMDD') &&
            untilDate.format('YYYYMMDD') >= currDate.format('YYYYMMDD'))
          )
            dayObject.type = 'between';

          dayColumn.push(dayObject);
        }
      }

      dayRow.push(dayColumn);
    } while (currDate.month() == currMonth);

    console.log(startDate &&
                startDate.format('YYYYMMDD') == currDate.format('YYYYMMDD'));

    return dayRow;
  };

  const dayStack = getDayStack(moment(month, 'YYYYMM'));

  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          padding: 20,
          textTransform: 'capitalize',
          fontWeight: 'bold',
        }}
      >
        {moment(month, 'YYYYMM').format('MMMM, YYYY')}
      </Text>
      <View >
        {dayStack.map((days:any, i:number) => {
          return (
            <DayRow
              days={days}
              dayProps={dayProps}
              key={i}
              onSelectDate={onSelectDate}
            />
          );
        })}
      </View>
    </View>
  );
};

const areEqual=(prevProps:IProps, nextProps:any)=> {
  if (nextProps.minDate != prevProps.minDate) return true;

  if (nextProps.maxDate != prevProps.maxDate) return true;

  if (nextProps.availableDates != prevProps.availableDates) return true;

  if (
    nextProps.startDate &&
    nextProps.startDate.format('YYYYMM') == nextProps.month
  )
    return true;

  if (
    nextProps.untilDate &&
    nextProps.untilDate.format('YYYYMM') == nextProps.month
  )
    return true;

  if (
    prevProps.startDate &&
    prevProps.startDate.format('YYYYMM') == nextProps.month
  )
    return true;

  if (
    prevProps.untilDate &&
    prevProps.untilDate.format('YYYYMM') == nextProps.month
  )
    return true;

  if (
    nextProps.startDate &&
    nextProps.untilDate &&
    nextProps.startDate.format('YYYYMM') < nextProps.month &&
    nextProps.untilDate.format('YYYYMM') > nextProps.month
  )
    return true;

  if (
    prevProps.untilDate &&
    prevProps.startDate &&
    prevProps.startDate.format('YYYYMM') < nextProps.month &&
    prevProps.untilDate.format('YYYYMM') > nextProps.month
  )
    return true;

  return false;
};

export default memo(Month, areEqual);
