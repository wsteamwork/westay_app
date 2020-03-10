import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import ButtonOriginal from 'components/Utils/ButtonOriginal';
import { Formik, FormikHelpers } from 'formik';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Keyboard,
  Picker,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { AuthContext, getProfile } from 'store/context/auth';
import { COLOR_TEXT_DEFAULT } from 'styles/global.style';
import { axios } from 'utils/api';
import { hp, wp } from 'utils/responsive';
import ItemProfile from './ItemProfile';
import Toast from 'react-native-root-toast';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}
interface ProfileValues {
  name: string;
  email: string;
  phone: string;
  description: string;
  job: string;
  emergency_contact: string;
}

const EditProfile: FC<IProps> = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { state, dispatch } = useContext(AuthContext);
  const { token, profile, languageStatus } = state;
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    if (profile) {
      setSelected(profile.gender);
    }
  }, [profile]);

  const handleChangeGender = (itemValue: number, itemIndex: number) => {
    setSelected(itemValue);
  };

  const handleClickSubmit = async (
    values: ProfileValues,
    actions: FormikHelpers<ProfileValues>,
  ) => {
    if (!values.name) {
      Toast.show(t('account:profile:emptyNameEdit'), {
        duration: Toast.durations.LONG,
        position: -100,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    } else if (!values.email) {
      Toast.show(t('account:profile:emptyEmailEdit'), {
        duration: Toast.durations.LONG,
        position: -100,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    } else if (!values.phone) {
      Toast.show(t('account:profile:emptyPhoneEdit'), {
        duration: Toast.durations.LONG,
        position: -100,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    } else {
      setLoadingSubmit(true);

      const body = { ...values, gender: selected };

      try {
        await axios.put('profile', body, {
          headers: { Authorization: token, 'Accept-Language': languageStatus },
        });

        setLoadingSubmit(false);
        Toast.show(t('account:profile:updateSuccess'), {
          duration: Toast.durations.LONG,
          position: -100,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        navigation.goBack();
        getProfile(token, dispatch, languageStatus);
      } catch (error) {
        setLoadingSubmit(false);
        Toast.show(t('account:profile:updateError'), {
          duration: Toast.durations.LONG,
          position: -100,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithBackTitle
        title={t('account:profile:name')}
        textHeaderStyle={{ color: COLOR_TEXT_DEFAULT, fontWeight: '700', fontSize: 24 }}
      />
      {profile && (
        <Formik
          initialValues={{
            name: profile.name ? profile.name : '',
            email: profile.email ? profile.email : '',
            phone: profile.phone ? profile.phone : '',
            description: profile.description ? profile.description : '',
            job: profile.job ? profile.job : '',
            emergency_contact: profile.emergency_contact ? profile.emergency_contact : '',
          }}
          validateOnChange={false}
          onSubmit={handleClickSubmit}>
          {({ handleChange, values, handleBlur, handleSubmit }) => (
            <View style={styles.scroll}>
              <TouchableOpacity
                style={{ flex: 1, paddingBottom: hp('10%') }}
                activeOpacity={1}
                onPress={Keyboard.dismiss}>
                <KeyboardAwareScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                  <View style={styles.viewItem}>
                    <Text style={styles.title}>{t('account:profile:information')}</Text>
                    <Text style={styles.description}>{t('account:profile:descriptionInfo')}</Text>
                  </View>

                  <View style={[styles.item, styles.picker]}>
                    <Picker
                      mode="dropdown"
                      selectedValue={selected}
                      style={{ flex: 1, width: wp('38%') }}
                      onValueChange={handleChangeGender}>
                      <Picker.Item label={t('account:profile:mr')} value={1} />
                      <Picker.Item label={t('account:profile:mrs')} value={2} />
                      <Picker.Item label={t('account:profile:unknown')} value={0} />
                      <Picker.Item label={t('account:profile:other')} value={4} />
                    </Picker>
                  </View>

                  <ItemProfile
                    placeholder="Name"
                    title="Họ và tên"
                    onChangeText={handleChange('name')}
                    value={values.name}
                    description={t('account:profile:descriptionName')}
                    onBlur={handleBlur('name')}
                  />

                  <ItemProfile
                    placeholder="Email"
                    keyboardType="email-address"
                    description={t('account:profile:descriptionEmail')}
                    title="Email"
                    onChangeText={handleChange('email')}
                    value={values.email}
                    onBlur={handleBlur('email')}
                  />

                  <ItemProfile
                    placeholder={t('account:profile:phone')}
                    keyboardType="phone-pad"
                    description={t('account:profile:descriptionPhone')}
                    title={t('account:profile:phone')}
                    onChangeText={handleChange('phone')}
                    value={values.phone}
                    onBlur={handleBlur('phone')}
                  />

                  <ItemProfile
                    placeholder={t('account:profile:autobiography')}
                    description={t('account:profile:descriptionAutobiography')}
                    title={t('account:profile:autobiography')}
                    onChangeText={handleChange('description')}
                    value={values.description}
                    onBlur={handleBlur('description')}
                  />

                  <View style={styles.viewItem}>
                    <Text style={styles.title}>{t('account:profile:additionalInfo')}</Text>
                    <Text style={styles.description}>
                      {t('account:profile:descriptionAdditionalInfo')}
                    </Text>
                  </View>

                  <ItemProfile
                    placeholder={t('account:profile:job')}
                    description={t('account:profile:descriptionJob')}
                    title={t('account:profile:job')}
                    onChangeText={handleChange('job')}
                    value={values.job}
                    onBlur={handleBlur('job')}
                  />

                  <ItemProfile
                    placeholder={t('account:profile:emergencyCommunication')}
                    description={t('account:profile:descriptionEmergency')}
                    title={t('account:profile:emergencyCommunication')}
                    onChangeText={handleChange('emergency_contact')}
                    value={values.emergency_contact}
                    onBlur={handleBlur('emergency_contact')}
                  />
                </KeyboardAwareScrollView>

                <View style={styles.boxButton}>
                  <ButtonOriginal
                    title={t('account:profile:save')}
                    handlePress={handleSubmit}
                    loading={loadingSubmit}
                    customStyle={styles.buttonStyle}
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  scroll: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: wp('5%')
  },
  item: {
    marginTop: hp('3%'),
    backgroundColor: 'white',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.1,
    elevation: 2,
  },
  viewItem: {
    height: hp('10%'),
    justifyContent: 'space-around',
    marginTop: hp('5%'),
    borderRadius: 4,
  },
  title: {
    fontWeight: '700',
    fontSize: wp('5%'),
    color: COLOR_TEXT_DEFAULT,
  },
  description: { fontSize: wp('4%'), color: COLOR_TEXT_DEFAULT },
  viewButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('4%'),
  },
  name: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 42,
    paddingHorizontal: wp('2%'),
  },
  picker: {
    height: 42,
    borderWidth: 0.5,
    borderColor: '#ddd',
    width: wp('40%'),
    shadowColor: '#ddd',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.1,
    elevation: 2,
  },
  boxButton: {
    position: 'absolute',
    bottom: 0,
    width: wp('100%'),
    height: hp('8%'),
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 10,
  },
  buttonStyle: {
    borderRadius: 5,
    elevation: 3,
  },
});
EditProfile.defaultProps = {};
export default withNavigation(EditProfile);
