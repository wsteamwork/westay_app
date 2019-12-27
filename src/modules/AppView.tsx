import React from 'react';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// import NavBottom from '../components/NavBottom';
import Home from '../screens/Home';
// import SearchResult from '../screens/SearchResult';



// const TabBarComponent = (props: any) => <View style={{
//   justifyContent: 'center',
//   alignItems: 'center',
//   height: 0
// }}><NavBottom /></View>;

const AppView = createBottomTabNavigator(
  {
    Home: {
      screen: Home
    },
    // Search: {
    //   screen: SearchResult
    // },
  },
  {
    // resetOnBlur: true,
    defaultNavigationOptions: {

    },
    backBehavior: "history",
    // tabBarComponent: () => (
    //   <TabBarComponent />
    // ),
    // tabBarOptions: {
    //   keyboardHidesTabBar: true,
    // }
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