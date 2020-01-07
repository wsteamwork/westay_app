import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

export const wp = width => Math.round(widthPercentageToDP(width));

export const hp = hight => Math.round(heightPercentageToDP(hight));

export const COLOR_TEXT_DEFAULT = '#484848';

export const COLOR_BUTTON_DEFAULT = '#41C9BC';

export const COLOR_BACKGROUND_DEFAULT = '#F7F9FF';

export const COLOR_PRICE_DEFAUTL = '#FF9F1C';

export const COLOR_TITLE_HEADER = '#41C9BC';

export const COLOR_BACKGROUND_WHITEBLUE = '#F7F9FF';

export const COLOR_ICON_DEFAULT = '#08C299';

export const COLOR_LINEAR_DEFAULT = ['#08C299', '#41C9BC'];

export const AVATAR_DEFAULT =
  'https://media.sketchfab.com/avatars/6c2b684ee5d7466b988d23edd6e4022b/0e2dd482648b49b3bcff0edb9f4da159.png';

export const dividerGrey = {
  backgroundColor: '#F0F0F0',
  width: wp('90%'),
  height: 1,
};
