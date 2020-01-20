import React from 'react';
import { View } from 'react-native-animatable';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import Trip from '../screens/Trip';
import NavBottom from '../components/NavBottom';
import Register from 'components/Auth/Register';
import Login from 'components/Auth/Login';
import ForgotPassword from 'components/Auth/ForgotPassword';
import BoxImageLT from 'components/LTRoom/BoxDetailRoom/BoxImageLT';
import BoxDetailRoom from 'components/LTRoom/BoxDetailRoom';

const TabBarComponent = (props: any) => <View style={{
  justifyContent: 'center',
  alignItems: 'center',
  height: 0
}}><NavBottom /></View>;

const AppView = createBottomTabNavigator(
  {
    Search: {
      // screen: Profile
      // screen: Register
      // screen: BoxImageLT
      screen: BoxDetailRoom
      // screen: Login
      // screen: ForgotPassword
    },
    Home: {
      screen: Home
    },
    Trip: {
      screen: Trip
    },
    Profile: {
      screen: Search
    },
  },
  {
    defaultNavigationOptions: {

    },
    backBehavior: "history",
    // tabBarComponent: () => (
    //   <TabBarComponent />
    // ),
    tabBarOptions: {
      keyboardHidesTabBar: true,
    }
  }
);

export default createAppContainer(AppView);
