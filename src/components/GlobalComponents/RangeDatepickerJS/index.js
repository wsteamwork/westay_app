'use strict';
import moment               from 'moment';
import React, {Component}   from 'react';
import {withTranslation}    from 'react-i18next';
import PropTypes                  from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  FlatList,
} from 'react-native';
import IonIcons             from 'react-native-vector-icons/Ionicons';
import {COLOR_TEXT_DEFAULT} from '../../../styles/global.style';
import {
  wp,
  hp,
}                           from '../../../utils/responsive';
import HeaderWithBackTitle  from '../../CustomHeaderNavigation/HeaderWithBackTitle';
import ButtonOriginal       from '../../Utils/ButtonOriginal';
import Month                from './Month';

const checkISO = Platform.OS === 'ios';

class RangeDatepicker extends Component {
  constructor(props) {
    super(props);
    // this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
    this.renderMonth = [];
    this.state = {
      startDate: props.startDate && moment(props.startDate, 'YYYYMMDD'),
      untilDate: props.untilDate && moment(props.untilDate, 'YYYYMMDD'),
      availableDates: props.availableDates || null,
      open: false,
    };
  }

  static defaultProps = {
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
    onClose: () => {},
    onSelect: () => {},
    onConfirm: () => {},
    placeHolderStart: 'Start Date',
    placeHolderUntil: 'Until Date',
    // placeHolderClose: ' &#10005;',
    placeHolderReset: 'Xóa',
    selectedBackgroundColor: 'green',
    selectedTextColor: 'white',
    betweenSelectedColor: 'green',
    todayColor: 'green',
    startDate: '',
    untilDate: '',
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

  static propTypes = {
    horizontal: PropTypes.bool,
    showActions: PropTypes.bool,
    priceByDay: PropTypes.object,
    initialMonth: PropTypes.string,
    dayHeadings: PropTypes.arrayOf(PropTypes.string),
    availableDates: PropTypes.arrayOf(PropTypes.string),
    maxMonth: PropTypes.number,
    buttonColor: PropTypes.string,
    buttonContainerStyle: PropTypes.object,
    startDate: PropTypes.string,
    untilDate: PropTypes.string,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    showReset: PropTypes.bool,
    showClose: PropTypes.bool,
    ignoreMinDate: PropTypes.bool,
    onClose: PropTypes.func,
    onSelect: PropTypes.func,
    onConfirm: PropTypes.func,
    placeHolderStart: PropTypes.string,
    placeHolderUntil: PropTypes.string,
    // placeHolderClose: PropTypes.string,
    placeHolderReset: PropTypes.string,
    selectedBackgroundColor: PropTypes.string,
    selectedTextColor: PropTypes.string,
    betweenSelectedColor: PropTypes.string,
    todayColor: PropTypes.string,
    infoText: PropTypes.string,
    infoStyle: PropTypes.object,
    infoContainerStyle: PropTypes.object,
  };

  componentWillMount() {
    this.getMonthStack();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ availableDates: nextProps.availableDates });
  }

  onSelectDate = date => {
    let startDate = null;
    let untilDate = null;
    const { availableDates } = this.state;

    if (this.state.startDate && !this.state.untilDate) {
      if (
        date.format('YYYYMMDD') < this.state.startDate.format('YYYYMMDD') ||
        this.isInvalidRange(date)
      ) {
        startDate = date;
      } else if (
        date.format('YYYYMMDD') > this.state.startDate.format('YYYYMMDD')
      ) {
        startDate = this.state.startDate;
        untilDate = date;
      } else {
        startDate = null;
        untilDate = null;
      }
    } else if (!this.isInvalidRange(date)) {
      startDate = date;
    } else {
      startDate = null;
      untilDate = null;
    }

    this.setState({ startDate, untilDate });
    this.props.onSelect(startDate, untilDate);
  };

  isInvalidRange(date) {
    const { startDate, untilDate, availableDates } = this.state;

    if (availableDates && availableDates.length > 0) {
      //select endDate condition
      if (startDate && !untilDate) {
        for (
          let i = startDate.format('YYYYMMDD');
          i <= date.format('YYYYMMDD');
          i = moment(i, 'YYYYMMDD')
            .add(1, 'days')
            .format('YYYYMMDD')
        ) {
          if (
            availableDates.indexOf(i) == -1 &&
            startDate.format('YYYYMMDD') != i
          )
            return true;
        }
      }
      //select startDate condition
      else if (availableDates.indexOf(date.format('YYYYMMDD')) == -1)
        return true;
    }

    return false;
  }



  getMonthStack() {
    // let res = [];
    const { maxMonth, initialMonth } = this.props;
    let initMonth = moment();
    if (initialMonth && initialMonth != '')
      initMonth = moment(initialMonth, 'YYYYMM');

    for (let i = 0; i < maxMonth; i++) {
      this.renderMonth.push(
        initMonth
          .clone()
          .add(i, 'month')
          .format('YYYYMM'),
      );
    }

    return this.renderMonth;
  }

  onReset = () => {
    this.setState({
      startDate: null,
      untilDate: null,
    });

    this.props.onSelect(null, null);
  };

  handleConfirmDate = () => {
    this.props.onConfirm &&
      this.props.onConfirm(this.state.startDate, this.state.untilDate);
  };

  handleRenderRow = month => {
    const {
      selectedBackgroundColor,
      selectedTextColor,
      todayColor,
      ignoreMinDate,
      minDate,
      maxDate,
      betweenSelectedColor,
      priceByDay,
    } = this.props;
    let { availableDates, startDate, untilDate } = this.state;

    if (availableDates && availableDates.length > 0) {
      availableDates = availableDates.filter(function(d) {
        if (d.indexOf(month) >= 0) return true;
      });
    }

    return (
      <Month
        onSelectDate={this.onSelectDate}
        startDate={startDate}
        untilDate={untilDate}
        availableDates={availableDates}
        minDate={minDate ? moment(minDate, 'YYYYMMDD') : minDate}
        maxDate={maxDate ? moment(maxDate, 'YYYYMMDD') : maxDate}
        ignoreMinDate={ignoreMinDate}
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

  render() {
    const { startDate, untilDate } = this.state;
    const { t, showActions, horizontal } = this.props;

    // const monthStack = this.ds.cloneWithRows(this.getMonthStack());
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
        {showActions && (
          <HeaderWithBackTitle
            rightComponent={
              <IonIcons
                name={checkISO ? 'ios-refresh' : 'md-refresh'}
                size={wp('6%')}
                color={COLOR_TEXT_DEFAULT}
                onPress={this.onReset}
              />
            }
          />
        )}

        {showActions && (
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
                {this.state.startDate
                  ? `${t('home:chooseDate:day')} ${moment(
                      this.state.startDate,
                    ).format('L')}`
                  : this.props.placeHolderStart}
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
                {this.state.untilDate
                  ? `Ngày ${moment(this.state.untilDate).format('L')}`
                  : this.props.placeHolderUntil}
              </Text>
            </View>
          </View>
        )}

        {this.props.infoText != '' && (
          <View style={this.props.infoContainerStyle}>
            <Text style={this.props.infoStyle}>{this.props.infoText}</Text>
          </View>
        )}
        <View style={styles.dayHeader}>
          {this.props.dayHeadings.map((day, i) => {
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
          {/*  horizontal={horizontal}*/}
          {/*  dataSource={monthStack}*/}
          {/*  renderRow={this.handleRenderRow}*/}
          {/*  initialListSize={1}*/}
          {/*  showsVerticalScrollIndicator={false}*/}
          {/*  showsHorizontalScrollIndicator={false}*/}
          {/*/>*/}

          <FlatList
            data={this.renderMonth}
            renderItem={({item})=> this.handleRenderRow(item)}
            initialNumToRender={1}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom:hp('30%')}}
          />
        </View>
        {showActions && (
          <View style={[styles.buttonWrapper, this.props.buttonContainerStyle]}>
            <Text style={{ fontSize: wp('4%') }}>
              {!startDate &&
                !untilDate &&
                t('home:chooseDate:chooseCheckinDate')}
              {startDate &&
                !untilDate &&
                t('home:chooseDate:chooseCheckoutDate')}
              {startDate &&
                untilDate &&
                this.props.days &&
                `${this.props.days} ${t('home:chooseDate:nightSelected')}`}
            </Text>

            <ButtonOriginal width={wp('25%')} title={t('home:chooseDate:submit')} handlePress={this.handleConfirmDate}/>
          </View>
        )}
      </View>
    );
  }
}

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
    position:'absolute',
    top: hp('90%'),
    width: wp('100%'),
    height: hp('10%'),
    zIndex: 9999
  },
  boxList:{
    marginBottom: hp('10%'),
  }
});

export default withTranslation()(RangeDatepicker);
