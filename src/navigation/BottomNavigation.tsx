import React from 'react';
import { View } from 'react-native-animatable';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from '../screens/Home';
import Trip from '../screens/Trip';
import NavBottom from '../components/NavBottom';
import Account from 'components/Account';
import { COLOR_TITLE_HEADER } from 'styles/global.style';
import IconTabCustom from 'components/Shared/IconTabCustom';

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
      screen: Stack(Trip, 'Trip', 'book'),
    },
    Profile: {
      screen: Stack(Account, 'Account', 'user'),
    },
  },
  {
    defaultNavigationOptions: {},
    backBehavior: 'history',
    // tabBarComponent: () => (
    //   <TabBarComponent />
    // ),
    tabBarOptions: {
      keyboardHidesTabBar: true,
    },
  },
);

export default createAppContainer(BottomNavigation);
