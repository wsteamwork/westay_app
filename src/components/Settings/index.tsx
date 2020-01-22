import React, { FC, useContext, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import _ from 'lodash';
import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import { COLOR_TEXT_DEFAULT, COLOR_BUTTON_DEFAULT, COLOR_TITLE_HEADER } from 'styles/global.style';
import { Text, Divider } from 'react-native-elements';
import { wp, hp } from 'utils/responsive';
import { AuthContext } from 'store/context/auth';
import { useTranslation } from 'react-i18next';
import storage from 'utils/storage';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}

const Settings: FC<IProps> = (props) => {
  const { state, dispatch } = useContext(AuthContext);
  const { languageStatus, token } = state;
  const { navigation } = props;
  const { t, i18n } = useTranslation();
  const [visibleCurrency, setVisibleCurrency] = useState(false);
  const handleChangeLanguage = (status: any) => {
    dispatch({ type: 'SET_LANGUAGE_STATUS', payload: status });
    storage.save({
      key: 'initLanguage',
      data: status,
    });

    status === 'vi' ? i18n.changeLanguage('vi') : i18n.changeLanguage('en');
  };
  const handleLogout = () => {
    storage.remove({ key: 'TOKEN' });
    dispatch({ type: 'SET_TOKEN', payload: null });
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <HeaderWithBackTitle title={t('account:settings:name')} textHeaderStyle={{ color: COLOR_TEXT_DEFAULT }} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.viewItem1}>
            <Text style={styles.textTitleItem}> {t('account:settings:currency')}</Text>
            <View style={styles.viewActionItem2}>
              <Text style={styles.textDetail}>{t('account:settings:standForCurrency')}</Text>
            </View>
          </View>
          <Divider style={{ backgroundColor: '#bcbcbc' }} />
        </View>
        <View>
          <View style={styles.viewItem1}>
            <Text style={styles.textTitleItem}> {t('account:settings:language')}</Text>

            <View style={styles.viewActionItem3}>
              <TouchableOpacity
                onPress={() => handleChangeLanguage('vi')}
                style={[
                  {
                    backgroundColor: languageStatus === 'vi' ? COLOR_BUTTON_DEFAULT : 'white',
                  },
                  styles.actionItem3,
                ]}>
                <Text
                  style={{
                    fontSize: wp('4%'),
                    fontWeight: '600',
                    color: languageStatus === 'vi' ? 'white' : COLOR_BUTTON_DEFAULT,
                  }}>
                  {t('account:settings:vietnamese')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleChangeLanguage('en')}
                style={[
                  {
                    backgroundColor: languageStatus === 'en' ? COLOR_BUTTON_DEFAULT : 'white',
                  },
                  styles.actionItem3,
                ]}>
                <Text
                  style={{
                    fontSize: wp('4%'),
                    fontWeight: '600',
                    color: languageStatus === 'en' ? 'white' : COLOR_BUTTON_DEFAULT,
                  }}>
                  {t('account:settings:english')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Divider style={{ backgroundColor: '#bcbcbc' }} />
        </View>
        <TouchableNativeFeedback onPress={() => setVisibleCurrency(true)}>
          <View style={styles.viewItem1}>
            <Text style={styles.textTitleItem}>{t('account:settings:notification')}</Text>
            <EvilIcons name="bell" size={25} color="#adadad" />
            {/* <Notification isVisible={visibleCurrency} onClose={()=>setVisibleCurrency(false)}/> */}
          </View>
        </TouchableNativeFeedback>
        <Divider style={{ backgroundColor: '#bcbcbc' }} />
        <TouchableNativeFeedback onPress={() => navigation.navigate('PrivacyPolicy')}>
          <View style={styles.viewItem1}>
            <Text style={styles.textTitleItem}>{t('account:settings:privatePolicy')}</Text>
            <Entypo name="chevron-right" size={25} color="#adadad" />

          </View>
        </TouchableNativeFeedback>
        <Divider style={{ backgroundColor: '#bcbcbc' }} />
        <TouchableNativeFeedback onPress={() => navigation.navigate('TermsAndConditions')}>
          <View style={styles.viewItem1}>
            <Text style={styles.textTitleItem}>{t('account:settings:termsAndConditions')}</Text>
            <Entypo name="chevron-right" size={25} color="#adadad" />
          </View>
        </TouchableNativeFeedback>
        <Divider style={{ backgroundColor: '#bcbcbc' }} />
        {token && (
          <View>
            <TouchableNativeFeedback onPress={() => navigation.navigate('Login')}>
              <View style={styles.viewItem1}>
                <Text style={styles.textTitleItem}>{t('account:settings:password')}</Text>
              </View>
            </TouchableNativeFeedback>
            <Divider style={{ backgroundColor: '#bcbcbc' }} />
            <TouchableOpacity onPress={handleLogout}>
              <View style={styles.viewItem1}>
                <Text style={[styles.textTitleItem, { color: 'tomato' }]}>
                  {t('account:settings:signout')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewItem1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('4%'),
  },
  textTitleItem: {
    fontSize: wp('4.2%'),
    fontWeight: '600',
    color: COLOR_TEXT_DEFAULT,
  },
  viewActionItem2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textDetail: { fontSize: wp('4.2%'), color: COLOR_TITLE_HEADER, fontWeight: '500' },
  viewActionItem3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionItem3: {
    paddingHorizontal: wp('2%'),
    paddingVertical: wp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLOR_BUTTON_DEFAULT,
    borderWidth: 1,
    borderRadius: 4,
    marginLeft: wp('1%'),
  },
  viewVersion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: hp('5.5%'),
    width: wp('90%'),
  },
  boxAppVer: {
    position: 'absolute',
    bottom: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('100%'),
  },
  textVersion: {
    color: '#929292',
    textAlign: 'center',
  },
});
Settings.defaultProps = {};
export default withNavigation(Settings);
