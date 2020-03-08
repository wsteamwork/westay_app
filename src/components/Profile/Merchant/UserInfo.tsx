import React, {FC, useContext, useState, useEffect, memo, useMemo} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import {wp, hp} from 'utils/responsive';
import LottieView from "lottie-react-native";
import moment from 'moment';
import {COLOR_TEXT_DEFAULT, COLOR_BUTTON_DEFAULT} from 'styles/global.style';
import {AuthContext, getProfile} from 'store/context/auth';
import {useTranslation} from 'react-i18next';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
// @ts-ignore
import { compose }                 from 'recompose';
import {ProfileViewInfoRes} from 'types/Profile/ProfileResponse';
import {useSelector} from 'react-redux';
import {ReducersList} from 'store/redux/reducers';
import {IMAGE_NOT_FOUND} from 'types/globalTypes';
import LoadingScreen from 'components/GlobalComponents/LoadingScreen';
import {getDataViewProfile} from 'store/redux/reducers/Profile/userProfile';
import Shield from 'static/shield.svg';
import ReviewSVG from 'static/images/review.svg';
import {RoomIndexRes} from 'types/Rooms/RoomResponses';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IProps extends NavigationInjectedProps{
  profile: ProfileViewInfoRes
}

const UserInfo: FC<IProps> = (props) => {
  const { navigation, profile} = props;
  const { state, dispatch } = useContext(AuthContext);
  const { token, languageStatus } = state;
  const { t } = useTranslation();

  const userRooms = useSelector<ReducersList, RoomIndexRes[]>(
    (state) => state.userProfile.userRooms
  );

  const totalReview = useMemo<number>(() => {
    let total = 0;
    if (!!userRooms) {
      userRooms.forEach((item) => {
        total += item.total_review;
      });
    }
    return total;
  }, [userRooms]);

  return (
    <View style={styles.boxProfile}>
      <Avatar
        rounded
        size={wp('15%')}
        // onEditPress={changeAvatar}
        // onPress={changeAvatar}
        renderPlaceholderContent={
          <LottieView
            source={require('../../../assets/lottie/homestay-loading.json')}
            autoPlay
            style={{ zIndex: 9 }}
          />
        }
        imageProps={{ resizeMode: 'cover' }}
        overlayContainerStyle={{ backgroundColor: 'white' }}
        source={{ uri: profile.avatar && profile.avatar_url !== '' ? profile.avatar_url : IMAGE_NOT_FOUND }}
        activeOpacity={0.7}
      />

      <View style={styles.rowContainer}>
        <Text numberOfLines={2} style={styles.name}>{profile.name}</Text>
        <Shield width={14} height={14} />
      </View>
      <Text style={{ fontSize: wp('4%'), marginTop: 4 }}>
        - {t('account:InfoMerchant:joinFrom')} {profile!.created_at.substring(0, 4)} -
      </Text>
      <View style={[styles.rowContainer, {justifyContent: 'space-between'}]}>
        <View style={[styles.rowContainer, { width:'50%'}]}>
          <MaterialCommunityIcons
            name="home-city-outline"
            size={16}
            color={COLOR_BUTTON_DEFAULT}
          />
          <Text numberOfLines={1} style={styles.txtSub}>{userRooms.length} {t('booking:bookingDetail:accommodation')}</Text>
        </View>
        <View style={[styles.rowContainer, {width:'50%'}]}>
          <ReviewSVG width={16} height={16} />
          <Text numberOfLines={1} style={styles.txtSub}>{totalReview} {t('account:InfoMerchant:review')}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxProfile: {
    // height: hp('20%'),
    paddingTop: hp('3%'),
    paddingBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  name: {
    color: COLOR_TEXT_DEFAULT,
    fontSize: wp('5%'),
    fontWeight: '700',
    marginRight: 4
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  txtSub:{
    paddingLeft: 10
  }
});

export default compose(
  withNavigation,
  memo,
)(UserInfo);
