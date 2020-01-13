import { StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { COLOR_TEXT_DEFAULT, SIZE_TEXT_TITLE_MEDIUM } from 'styles/global.style';

export const wp = (width: any) => Math.round(widthPercentageToDP(width));

export const hp = (hight: any) => Math.round(heightPercentageToDP(hight));

export const dividerGrey = {
  backgroundColor: '#F0F0F0',
  width: wp('90%'),
  height: 1,
};

export const stylesGlobal = StyleSheet.create({
  titleGlobal: {
    paddingVertical: hp('1.5%'),
    // fontSize: wp('6%'),
    fontSize: SIZE_TEXT_TITLE_MEDIUM,
    fontWeight: '600',
    color: COLOR_TEXT_DEFAULT,
    // backgroundColor: 'red',
  },
  dividerGrey: {
    backgroundColor: '#F0F0F0',
    width: wp('90%'),
    height: 1,
  },

});
