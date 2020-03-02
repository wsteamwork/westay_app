import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Divider, Text } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { AuthContext } from 'store/context/auth';
import { COLOR_TEXT_DEFAULT } from 'styles/global.style';
import { hp, wp } from 'utils/responsive';
interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}

const Profile: FC<IProps> = (props) => {
  const { state, dispatch } = useContext(AuthContext);
  const { languageStatus, token, fcmToken } = state;
  const { navigation } = props;
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Phạm Đức Nhất</Text>
      <ScrollView style={styles.scrollView}>
        <Divider style={{ backgroundColor: '#bcbcbc' }} />
        <TouchableWithoutFeedback onPress={() => navigation.navigate('EditProfile')}>
          <View style={styles.viewItem1}>
            <Text style={styles.textTitleItem}>{t('account:profile:name')}</Text>
            <Entypo name="chevron-right" size={25} color="#adadad" />
          </View>
        </TouchableWithoutFeedback>
        <Divider style={{ backgroundColor: '#bcbcbc' }} />
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Settings')}>
          <View style={styles.viewItem1}>
            <Text style={styles.textTitleItem}>{t('account:settings:name')}</Text>
            <Entypo name="chevron-right" size={25} color="#adadad" />
          </View>
        </TouchableWithoutFeedback>
        <Divider style={{ backgroundColor: '#bcbcbc' }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: wp('7%'),
    width: wp('100%'),
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp('6%'),
    color: COLOR_TEXT_DEFAULT,
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
});
Profile.defaultProps = {};
export default withNavigation(Profile);
