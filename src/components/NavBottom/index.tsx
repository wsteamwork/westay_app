import React, { FC, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import Notification from 'static/alarm.svg';
import Etsy from 'static/etsy.svg';
import SuppriseBox from 'static/open-box.svg';
import Search from 'static/search.svg';
// import { COLOR_BACKGROUND_BUTTON } from 'styles/global.style';
// import { hp, wp } from '../utils/responsive';
import { COLOR_BACKGROUND_BUTTON } from 'styles/global.style';
import { hp, wp } from 'utils/responsive';
interface IProps extends NavigationInjectedProps {

};

const NavBottom: FC<IProps> = (props) => {
  const [active, setActive] = useState(1);
  const { navigation } = props;
  const setScreenBottomNav = (active: number, screen: string) => {
    setActive(active);
    navigation.navigate(screen);
  }
  return (
    <View style={styles.navBottomContainer}>
      <View style={styles.buttonActionContainer}>
        <TouchableOpacity onPress={() => { setScreenBottomNav(1, 'Trip') }}>
          <Etsy width={24} height={24} />
          {/* <SvgXml width="24" height="24" xml={Etsy} fill={active == 1 ? '#49654E' : '#7676766f'} /> */}
        </TouchableOpacity>
      </View>
      <View style={styles.buttonActionContainer} >
        <TouchableOpacity onPress={() => { setScreenBottomNav(2, 'Search') }}>
          <Search width={24} height={24} />
          {/* <SvgXml width="24" height="24" xml={Search} fill={active == 2 ? '#49654E' : '#7676766f'} /> */}
        </TouchableOpacity>
      </View>
      <View style={styles.buttonActionContainer} >
        <TouchableOpacity onPress={() => { setScreenBottomNav(3, 'Profile') }}>
          <Notification width={24} height={24} />
          {/* <SvgXml width="24" height="24" xml={Notification} fill={active == 3 ? '#49654E' : '#7676766f'} /> */}
        </TouchableOpacity>
      </View>
      <View style={[styles.buttonActionContainer, { paddingBottom: 5 }]} >
        <TouchableOpacity onPress={() => { setActive(4) }}>
          <SuppriseBox width={24} height={24} />
          {/* <SvgXml width="24" height="24" xml={SuppriseBox} fill={active == 4 ? '#49654E' : '#7676766f'} /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navBottomContainer: {
    flexDirection: 'row',
    width: wp('56%'),
    height: 48,
    borderRadius: 50,
    bottom: hp('6%'),
    position: 'relative',
    paddingHorizontal: 5,
    backgroundColor: COLOR_BACKGROUND_BUTTON
  },
  buttonActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%'
  }
});

NavBottom.defaultProps = {

}
export default withNavigation(NavBottom);
