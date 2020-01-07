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

const TabBarComponent = (props: any) => <View style={{
  justifyContent: 'center',
  alignItems: 'center',
  height: 0
}}><NavBottom /></View>;

const AppView = createBottomTabNavigator(
  {
    Search: {
      // screen: Profile
      screen: Register
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
    // resetOnBlur: true,
    defaultNavigationOptions: {

    },
    backBehavior: "history",
    tabBarComponent: () => (
      <TabBarComponent />
    ),
    tabBarOptions: {
      keyboardHidesTabBar: true,
    }
  }
);

// const AppView = createStackNavigator(
//   {
//     Home: {
//       screen: Home
//     },
//     Search: {
//       screen: SearchResult
//     },
//   },
//   {
//     headerMode: 'none'
//   }
// );

export default createAppContainer(AppView);