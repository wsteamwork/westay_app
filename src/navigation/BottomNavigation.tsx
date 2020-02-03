import React from 'react';
import { View } from 'react-native-animatable';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from '../screens/Home';
import Trip from '../screens/Trip';
import NavBottom from '../components/NavBottom';
import Account from 'components/Account';

const TabBarComponent = (props: any) => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      height: 0,
    }}>
    <NavBottom />
  </View>
);

const BottomNavigation = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
    },
    Trip: {
      screen: Trip,
    },
    Profile: {
      screen: Account,
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
