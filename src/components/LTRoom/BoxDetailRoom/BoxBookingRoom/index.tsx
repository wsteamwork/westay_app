import { COLOR_BUTTON_DEFAULT, hp } from 'components/Utils/responsive.style';
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';
import { SIZE_TEXT_TITLE } from 'styles/global.style';
import { wp } from 'utils/responsive';
import {useTranslation} from 'react-i18next';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}

const BoxBookingRoom: FC<IProps> = (props) => {
  const { navigation } = props;
  const listing = useSelector<ReducersList, any>((state) => state.ltRoomDetails.room);
  const { t } = useTranslation();
  return (
    <View style={styles.boxPrice}>
      <View
        style={{
          // alignItems: 'center',
          // jus
          marginBottom: 5,
          paddingLeft: 4,
          width: wp('60%'),
          justifyContent: 'center',
          // backgroundColor: 'red',
          // flexDirection: 'row',
        }}>
        <Text style={styles.txtPrice}>
          ${listing.price_display}
          <Text style={{ fontSize: 11 }}> /{t('shared:month')}</Text>
        </Text>
      </View>
      <View style={{ marginBottom: 0 }}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('ChooseDayBookingLT')}>
          <Text style={styles.titleStyle}>{t('shared:bookNow')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxPrice: {

    position: 'absolute',
    bottom: 0,
    width: wp('100%'),
    height: hp('8%'),
    backgroundColor: 'white',
    // borderTopColor: 'black',
    // borderTopWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHo
    // alignItems: 'flex-start',
    paddingHorizontal: 16,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 5.3,
    elevation: 10,
  },
  txtPrice: {
    // lineHeight: 30,
    fontSize: SIZE_TEXT_TITLE,
    fontWeight: '600',
  },
  buttonStyle: {
    width: wp('30%'),
    height: 38,
    borderRadius: 360,
    backgroundColor: COLOR_BUTTON_DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  titleStyle: {
    color: 'white',
    fontWeight: '500',
    marginRight: 3,
  },
});
BoxBookingRoom.defaultProps = {};
export default withNavigation(BoxBookingRoom);
