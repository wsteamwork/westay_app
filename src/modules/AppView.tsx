import React from 'react';
import { View } from 'react-native-animatable';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Trip from '../screens/Trip';
import NavBottom from '../components/NavBottom';
import RootNavigation from 'navigation/RootNavigation';
import RoomNavigation from 'navigation/RoomNavigation';

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

const AppView = createBottomTabNavigator(
  {
    Search: {
      // screen: RoomNavigation,
      screen: RootNavigation,
      // screen: BoxImageLT
    },
    Home: {
      screen: Home,
    },
    Trip: {
      screen: Trip,
    },
    Profile: {
      screen: Search,
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

export default createAppContainer(AppView);
