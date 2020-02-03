import React, {useContext, Component, FC} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import IconNoInternet from '../assets/images/no-internet.svg';
import { useTranslation } from 'react-i18next';
import {AuthContext} from 'store/context/auth';
import {wp, hp} from 'utils/responsive';
import {COLOR_TEXT_DEFAULT} from 'styles/global.style';

export const withInternet = (Component:FC) => (props:any) => {
  const { isConnected } = useContext(AuthContext);

  const { t } = useTranslation();

  return isConnected ? (
    <Component {...props} />
  ) : (
    <View style={styles.container}>
      <StatusBar
        translucent
        animated
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <IconNoInternet />
      <Text style={styles.title}>{t('shared:noInternet')}</Text>
      <Text style={styles.desc}>{t('shared:descNoInternet')}</Text>
      <TouchableOpacity style={styles.actions}>
        <Text style={styles.textActions}>{t('shared:retry')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('5%'),
  },
  title: {
    fontWeight: '400',
    fontSize: wp('5.5%'),
    marginTop: hp('2%'),
    color: COLOR_TEXT_DEFAULT,
  },
  desc: {
    fontSize: wp('4%'),
    color: '#8A8A8A',
    fontWeight: '400',
    marginTop: hp('2%'),
  },
  actions: {
    height: hp('4.5%'),
    width: wp('30%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF9F1C',
    borderRadius: 10,
    marginTop: hp('2%'),
  },
  textActions: { fontSize: wp('4%'), fontWeight: '600', color: 'white' },
});
