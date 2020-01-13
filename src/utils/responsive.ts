import { StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { COLOR_TEXT_DEFAULT, SIZE_TEXT_TITLE_MEDIUM } from 'styles/global.style';

export const wp = (width: any) => Math.round(widthPercentageToDP(width));

export const hp = (hight: any) => Math.round(heightPercentageToDP(hight));

export const COLOR_BUTTON_DEFAULT = '#41C9BC';

export const COLOR_BACKGROUND_DEFAULT = '#F7F9FF';

export const COLOR_PRICE_DEFAUTL = '#FF9F1C';

export const COLOR_TITLE_HEADER = '#41C9BC';

export const COLOR_BACKGROUND_WHITEBLUE = '#F7F9FF';

export const COLOR_ICON_DEFAULT = '#08C299';

export const COLOR_LINEAR_DEFAULT = ['#08C299', '#41C9BC'];
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
