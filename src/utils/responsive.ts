import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import {COLOR_TEXT_DEFAULT} from 'styles/global.style';
import {StyleSheet} from 'react-native';

export const wp = (width: any) => Math.round(widthPercentageToDP(width));

export const hp = (hight: any) => Math.round(heightPercentageToDP(hight));

export const dividerGrey = {
  backgroundColor: '#F0F0F0',
  width: wp('90%'),
  height: 1,
};

export const stylesGlobal = StyleSheet.create({
  titleGlobal:{
    paddingVertical: hp('2%'),
    fontSize: wp('6%'),
    fontWeight: '700',
    color: COLOR_TEXT_DEFAULT
  },
  dividerGrey: {
    backgroundColor: '#F0F0F0',
    width: wp('90%'),
    height: 1,
  }
});
