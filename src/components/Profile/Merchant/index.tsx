import React, {FC, useEffect, useContext} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
// @ts-ignore
import UserInfo from 'components/Profile/Merchant/UserInfo';
import {getDataViewProfile, UserProfileActions} from 'store/redux/reducers/Profile/userProfile';
import {useSelector, useDispatch} from 'react-redux';
import {ReducersList, ReducersActions} from 'store/redux/reducers';
import {ProfileViewInfoRes} from 'types/Profile/ProfileResponse';
import {AuthContext} from 'store/context/auth';
import {Dispatch} from 'redux';
import {hp, wp} from 'utils/responsive';
import LoadingScreen from 'components/GlobalComponents/LoadingScreen';
import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import {useTranslation} from 'react-i18next';
import UserDetails from 'components/Profile/Merchant/UserDetails';

interface IProps extends NavigationInjectedProps{

}

const MerchantInfo: FC<IProps> = (props) => {
  const { navigation } = props;
  const { state } = useContext(AuthContext);
  const { languageStatus } = state;
  const dispatch = useDispatch<Dispatch<UserProfileActions>>();
  const idUser = navigation.getParam('idUser');
  const profile = useSelector<ReducersList, ProfileViewInfoRes | null>(
    (state) => state.userProfile.profile
  );
  const {t}          = useTranslation();

  useEffect(() => {
    getDataViewProfile(idUser, dispatch, languageStatus);
  }, []);

  useEffect(() => {

  }, [profile]);

  return profile ? (
    <View style={styles.container}>
      <HeaderWithBackTitle handlePress={()=> navigation.goBack()}
                           title={t('account:InfoMerchant:information')}/>
      <View style={{paddingHorizontal: wp('5%')}}>
        <UserInfo profile={profile}/>

        <UserDetails/>
      </View>
    </View>
  ) : (
    <LoadingScreen loading={!!profile}/>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});

export default withNavigation( MerchantInfo );
