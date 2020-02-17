import React, { memo } from 'react';
import {ScrollView, StyleProp, ButtonProps, ViewStyle} from 'react-native';
import { Button } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import {wp, hp} from 'utils/responsive';
import {COLOR_BUTTON_DEFAULT} from 'styles/global.style';
import {setToggleChoosePeople} from 'store/actions/search/searchActions';
import {ReducersList} from 'store/redux/reducers';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
// @ts-ignore
import { compose } from 'recompose';
interface IProps extends NavigationInjectedProps{

}

interface ICustomBtn {
  titleStyle: StyleProp<any>,
  buttonStyle: StyleProp<any>,
  title: string,
  onPress:()=>any
}

const CustomButton = (props:ICustomBtn) => (
  <Button
    type="outline"
    titleStyle={{ color: '#717171', fontSize: wp('4%'), ...props.titleStyle }}
    style={{ paddingHorizontal: 10 }}
    buttonStyle={{
      borderColor: '#bbb',
      marginRight: 10,
      paddingHorizontal: wp('3%'),
      paddingVertical: wp('1%'),
      ...props.buttonStyle,
    }}
    title={props.title}
    onPress={props.onPress}
  />
);

const CollapHeader = (props:IProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const check_in = useSelector<ReducersList, string>(state => state.searchField.check_in);
  const check_out = useSelector<ReducersList, string>(state => state.searchField.check_out);
  const number_room = useSelector<ReducersList, number>(state => state.searchField.bedrooms);
  const number_guest = useSelector<ReducersList, number>(state => state.searchField.number_guest);
  // const rent_type = useSelector<ReducersList, number | undefined>(state => state.searchField.accommodation_type);
  const instant_book = useSelector<ReducersList,  number | undefined>(state => state.searchField.instant_book);
  const amenities = useSelector<ReducersList, number[] | null | undefined>(state => state.searchField.comfort_lists);
  const room_type = useSelector<ReducersList, number | undefined>(state => state.searchField.accommodation_type);

  const {
    navigation: { navigate },
  } = props;

  const checkFilter = instant_book || amenities || room_type;

  const checkDate = () => {
    if (!check_in && !check_out) {
      return t('listRooms:day');
    } else {
      return `${moment(check_in).format('MMM Do')}${check_out &&
        ` - ${moment(check_out).format('MMM Do')}`}`;
    }
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={{
        alignItems: 'center',
        paddingHorizontal: wp('5%'),
      }}
    >
      <CustomButton
        title={checkDate()}
        onPress={() => navigate('ChooseDate')}
        buttonStyle={
          check_in &&
          check_out && {
            backgroundColor: COLOR_BUTTON_DEFAULT,
            borderColor: 'white',
          }
        }
        titleStyle={check_in && check_out && { color: 'white' }}
      />

      <CustomButton
        title={
          number_guest
            ? `${number_guest} ${t('listRooms:guest')}`
            : t('listRooms:guestUpper')
        }
        onPress={() => dispatch(setToggleChoosePeople(true))}
        buttonStyle={
          number_guest && {
            backgroundColor: COLOR_BUTTON_DEFAULT,
            borderColor: 'white',
          }
        }
        titleStyle={number_guest && { color: 'white' }}
      />

      <CustomButton
        title={
          number_room
            ? `${number_room} ${t('listRooms:room')}`
            : t('listRooms:bedRoom')
        }
        onPress={() => dispatch(setToggleChoosePeople(true))}
        buttonStyle={
          number_room && {
            backgroundColor: COLOR_BUTTON_DEFAULT,
            borderColor: 'white',
          }
        }
        titleStyle={number_room && { color: 'white' }}
      />

      <CustomButton
        title={t('listRooms:filter')}
        onPress={() => navigate('Filter')}
        buttonStyle={
          checkFilter && {
            backgroundColor: COLOR_BUTTON_DEFAULT,
            borderColor: 'white',
          }
        }
        titleStyle={checkFilter && { color: 'white' }}
      />
    </ScrollView>
  );
};

const collapsibleParams = {
  collapsibleComponent: compose(
    withNavigation,
    memo,
  )(CollapHeader),
  collapsibleBackgroundStyle: {
    height: hp('6%'),
    disableFadeoutInnerComponent: false,
    backgroundColor: 'white',
  },
};

export default collapsibleParams;
