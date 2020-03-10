import Profile from 'components/Profile';
import IconTabCustom from 'components/Shared/IconTabCustom';
import { withAuth } from 'hocs/withAuth';
import { withInternet } from 'hocs/withInternet';
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// @ts-ignore
import { compose } from 'recompose';
import { COLOR_TITLE_HEADER } from 'styles/global.style';
import Home from '../screens/Home';
import Trip from '../screens/Trip';
import Host from '../screens/Host';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const Stack = (screen: any, nameScreen: string, nameIcon: string) => {
  const ScreenStack = createSwitchNavigator({
    [nameScreen]: {
      screen,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
  });

  ScreenStack.navigationOptions = ({ navigation }) => ({
    tabBarIcon: ({ focused }: any) => {
      return (
        <IconTabCustom
          name={nameIcon}
          color={focused ? COLOR_TITLE_HEADER : '#8E8E93'}
          navigation={navigation}
        />
      );
    },
    tabBarOptions: {
      showLabel: false,
    },
  });

  return ScreenStack;
};

const BottomNavigation = createBottomTabNavigator(
  {
    Home: {
      screen: Stack(Home, 'Home', 'home'),
    },
    Trip: {
      screen: Stack(
        compose(
          withAuth,
          withInternet,
        )(Trip), 'Trip', 'book'),
    },
    Host: {
      screen: Stack(
        compose(
          withAuth,
          withInternet,
        )(Host), 'Host', 'sync'),
    },
    Profile: {
      screen: Stack(
        compose(
          withAuth,
          withInternet,
        )(Profile), 'Account', 'user'),
    },
  },
  {
    defaultNavigationOptions: {},
    backBehavior: 'history',
    tabBarOptions: {
      keyboardHidesTabBar: true,
    },
  },
);

export default createAppContainer(BottomNavigation);
