import React, {FC, useContext, memo} from 'react';
import {StyleSheet, View, ActivityIndicator, StatusBar, TouchableOpacity, Text, Platform} from 'react-native';
import {NavigationInjectedProps, withNavigation, NavigationScreenProp} from 'react-navigation';
import {useTranslation} from 'react-i18next';
import {AuthContext} from 'store/context/auth';
import {wp, hp} from 'utils/responsive';
import {COLOR_TEXT_DEFAULT, COLOR_BUTTON_DEFAULT} from 'styles/global.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native-elements';
// @ts-ignore
import { compose } from 'recompose';

const checkISO = Platform.OS === 'ios';

interface IProps extends NavigationInjectedProps{
}

export const withAuth = (Component:FC<IProps>) => (props: IProps) => {
  const { navigation } = props;
  const { state } = useContext(AuthContext);
  const { token } = state;
  const { t } = useTranslation();

  return token ? (
    <Component {...props}/>
  ) : (
    <View style={styles.container}>
      <StatusBar
        translucent
        animated
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      {/*<NoToken height={hp('100%')} />*/}

      <Image
        source={require('../assets/images/auth_screen.jpg')}
        style={{ width: wp('100%'), height: hp('100%') }}
        PlaceholderContent={<ActivityIndicator />}
      />

      <View style={styles.boxLogo}>
        <Image source={require('assets/images/images_web/logo_transparent.png')} style={styles.logo}/>
      </View>

      <View style={styles.setting}>
        <Ionicons
          name={checkISO ? 'ios-settings' : 'md-settings'}
          size={wp('7%')}
          onPress={() => navigation.navigate('Settings')}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.signin}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.textSignin}>{t('shared:signin')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signup}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.textSignup}>{t('shared:signup')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  actions: {
    position: 'absolute',
    height: hp('12%'),
    left: 0,
    right: 0,
    bottom: hp('4%'),
    paddingHorizontal: wp('6%'),
    justifyContent: 'space-between',
  },
  signin: {
    height: hp('6%'),
    backgroundColor: COLOR_BUTTON_DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:4,
    marginBottom:12,
  },
  textSignin: { fontWeight: '600', fontSize: wp('4%'), color: 'white' },
  signup: {
    height: hp('6%'),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:4,
  },
  textSignup: {
    fontWeight: '600',
    fontSize: wp('4%'),
    color: COLOR_TEXT_DEFAULT,
  },
  setting: {
    position: 'absolute',
    top: hp('6%'),
    right: wp('5%'),
    backgroundColor: 'white',
    width:wp('11%'),
    height:wp('11%'),
    borderRadius:50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  logo:{
    width: wp('45%'),
    height: wp('30%'),
    resizeMode: 'cover',
  },
  boxLogo:{
    position: 'absolute',
    top: hp('1%'),
    left: wp('1%'),
    zIndex:9
  },
});

