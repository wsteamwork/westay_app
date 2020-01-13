import React, { FC } from 'react';
import { View, StatusBar} from 'react-native';
import {wp} from 'utils/responsive';
// @ts-ignore
import Spinner                   from 'react-native-loading-spinner-overlay';
import LottieView                from 'lottie-react-native';

interface IProps {
  loading: boolean;
}

const LoadingScreen: FC<IProps> = (props) => {
  const { loading } = props;

  return (
    <Spinner
      visible={loading}
      animation="fade"
      cancelable={true}
      overlayColor="rgba(0, 0, 0, 0.7)"
      children={
        <View style={{ flex: 1, justifyContent:'center', alignItems:'center'}}>
          <View style={{ width: wp('40%'), height: wp('40%')}}>
            <StatusBar
              translucent={true}
              backgroundColor="rgba(0, 0, 0, 0.7)"
              barStyle="dark-content"
              animated={true}
            />
            <LottieView
              source={require('../../../assets/lottie/homestay-loading.json')}
              autoPlay
              style={{ zIndex: 9999 }}
            />
          </View>
        </View>
      }
    />
  );
};

LoadingScreen.defaultProps ={
  loading: false,
};

export default LoadingScreen;
