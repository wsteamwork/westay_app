import React, { FC, useState } from 'react';
import { StyleSheet, View, Image, Alert, Text } from 'react-native';
import ButtonOriginal from 'components/Utils/ButtonOriginal';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { hp, wp } from 'utils/responsive';
interface IProps extends NavigationInjectedProps{
  initialProps?: any;
}

const IntroApp: FC<IProps> = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.textContainerMiddle}>
      <Image
        style={styles.image}
        source={require('../../../../src/static/images/pngkey.com-traveling-png-1965681.png')}
      />
      <Text style={styles.titleText}>Welcome to Westay</Text>
      <Text style={styles.titleSubText}>Book one of our unique hotel to escape the ordinary</Text>
      <ButtonOriginal
        title="Log in"
        handlePress={() => navigation.navigate('Login')}
        customStyle={styles.marginBottom}
      />
      <ButtonOriginal title="Create Acount" handlePress={() => navigation.navigate('Register')} />
    </View>
  );
};

const styles = StyleSheet.create({
  textContainerMiddle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginBottom: {
    marginBottom: hp('3%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    height: hp('20%'),
    width: wp('75%'),
    borderRadius: 5,
    marginBottom: hp('7%'),
  },
  titleText: {
    marginBottom: hp('2%'),
    fontSize: wp('7%'),
    fontWeight: '700',
  },
  titleSubText: {
    marginBottom: hp('6%'),
    fontSize: wp('4%'),
    width: wp('60%'),
    textAlign: 'center',
    color: '#8A8A8F',
  },
});
IntroApp.defaultProps = {};
export default withNavigation(IntroApp);
