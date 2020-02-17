'use strict';
import React                                                from 'react';
import { View, Text, TouchableWithoutFeedback, Dimensions } from 'react-native';
import moment                                               from 'moment';
import {DEFAULT_DATE_FORMAT}                                from '../../../types/globalTypes';
import {wp}                                                 from '../../../utils/responsive';
const DEVICE_WIDTH = Dimensions.get('window').width;

export default class Day extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.day.type == this.props.day.type) return false;

    return true;
  }

  render() {
    let { day, dayProps } = this.props;
    const { priceByDay } = dayProps;

    let dayStyle = { backgroundColor: 'transparent', position: 'relative', width: wp('90%') / 7 };
    let textDayStyle = { color: 'black' };

    switch (day.type) {
      case 'single':
        dayStyle = {
          backgroundColor: dayProps.selectedBackgroundColor,
          borderRadius: Math.floor(DEVICE_WIDTH / 7),
          width: wp('90%') / 7,
        };
        textDayStyle = { color: dayProps.selectedTextColor };
        break;
      case 'first':
        dayStyle = {
          backgroundColor: dayProps.selectedBackgroundColor,
          width: wp('90%') / 7,
          borderBottomLeftRadius: Math.floor(DEVICE_WIDTH / 7),
          borderTopLeftRadius: Math.floor(DEVICE_WIDTH / 7),
        };
        textDayStyle = { color: dayProps.selectedTextColor };
        break;
      case 'last':
        dayStyle = {
          backgroundColor: dayProps.selectedBackgroundColor,
          width: wp('90%') / 7,
          borderBottomRightRadius: Math.floor(DEVICE_WIDTH / 7),
          borderTopRightRadius: Math.floor(DEVICE_WIDTH / 7),
        };
        textDayStyle = { color: dayProps.selectedTextColor };
        break;
      case 'between':
        dayStyle = { backgroundColor: dayProps.betweenSelectedColor, width: wp('90%') / 7, };
        textDayStyle = { color: dayProps.selectedTextColor };
        break;
      case 'disabled':
      case 'blockout':
        textDayStyle = { color: '#ccc' };
      default:
        break;
    }

    if (day.date) {
      if (day.type == 'disabled')
        return (
          <TouchableWithoutFeedback activeOpacity={1} style={dayStyle}>
            <View
              style={{
                ...dayStyle,
                height: Math.floor(DEVICE_WIDTH / 7),
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  ...textDayStyle,
                  textAlign: 'center',
                  width: Math.floor(DEVICE_WIDTH / 7),
                  backgroundColor: 'transparent',
                  fontSize: Math.floor(DEVICE_WIDTH / 26),
                }}
              >
                {moment(day.date, 'YYYYMMDD').date()}
              </Text>
              {day.date == moment().format('YYYYMMDD') ? (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                  }}
                >
                  <Text
                    style={{
                      fontSize: Math.floor(DEVICE_WIDTH / 17),
                      fontWeight: 'bold',
                      color: '#ccc',
                      textAlign: 'center',
                    }}
                  >
                    __
                  </Text>
                </View>
              ) : null}
            </View>
          </TouchableWithoutFeedback>
        );
      else if (day.type == 'blockout') {
        const strikeTop = Math.floor(DEVICE_WIDTH / -22);
        return (
          <TouchableWithoutFeedback activeOpacity={1} style={dayStyle}>
            <View
              style={{
                ...dayStyle,
                height: Math.floor(DEVICE_WIDTH / 7),
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  ...textDayStyle,
                  textAlign: 'center',
                  width: Math.floor(DEVICE_WIDTH / 7),
                  backgroundColor: 'transparent',
                  fontSize: Math.floor(DEVICE_WIDTH / 26),
                }}
              >
                {moment(day.date, 'YYYYMMDD').date()}
              </Text>
              <View
                style={{
                  position: 'absolute',
                  top: strikeTop,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                }}
              >
                <Text
                  style={{
                    fontSize: Math.floor(DEVICE_WIDTH / 17),
                    color: '#ccc',
                    textAlign: 'center',
                  }}
                >
                  __
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        );
      } else
        return (
          <TouchableWithoutFeedback
            activeOpacity={1}
            style={dayStyle}
            onPress={() =>
              this.props.onSelectDate(moment(day.date, 'YYYYMMDD'))
            }
          >
            <View
              style={{
                ...dayStyle,
                height: Math.floor(DEVICE_WIDTH / 7),
                justifyContent: 'center',
              }}
            >
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    ...textDayStyle,
                    textAlign: 'center',
                    width: Math.floor(DEVICE_WIDTH / 7),
                    backgroundColor: 'transparent',
                    fontSize: Math.floor(DEVICE_WIDTH / 26),
                  }}
                >
                  {moment(day.date, 'YYYYMMDD').date()}
                </Text>
                {priceByDay[
                  moment(day.date, 'YYYYMMDD').format(DEFAULT_DATE_FORMAT)
                ] && (
                  <Text
                    style={{
                      ...textDayStyle,
                      fontSize: wp('2.5%'),
                      fontWeight: '600',
                    }}
                  >
                    {priceByDay[
                      moment(day.date, 'YYYYMMDD').format(DEFAULT_DATE_FORMAT)
                    ].price_day / 1000000}
                    TR
                  </Text>
                )}
              </View>

              {/* {day.date == moment().format('YYYYMMDD') ? (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                  }}
                >
                  <Text
                    style={{
                      fontSize: Math.floor(DEVICE_WIDTH / 17),
                      fontWeight: 'bold',
                      color: dayProps.selectedBackgroundColor,
                      textAlign: 'center',
                    }}
                  >
                    __
                  </Text>
                </View>
              ) : null} */}
            </View>
          </TouchableWithoutFeedback>
        );
    } else
      return (
        <TouchableWithoutFeedback activeOpacity={1} style={dayStyle}>
          <View
            style={{
              ...dayStyle,
              height: Math.floor(DEVICE_WIDTH / 7),
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                ...textDayStyle,
                textAlign: 'center',
                width: Math.floor(DEVICE_WIDTH / 7),
                backgroundColor: 'transparent',
                fontSize: Math.floor(DEVICE_WIDTH / 24),
              }}
            >
              {null}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
  }
}
