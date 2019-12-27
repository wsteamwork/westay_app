import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

export const wp = (width: any) => Math.round(widthPercentageToDP(width));

export const hp = (hight: any) => Math.round(heightPercentageToDP(hight));
export const dividerGrey = {
  backgroundColor: '#F0F0F0',
  width: wp('90%'),
  height: 1,
};
