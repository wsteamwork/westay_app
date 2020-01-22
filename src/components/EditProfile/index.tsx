import React, { FC, useContext, useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Picker,
  TextInput,
} from 'react-native';
import _ from 'lodash';
import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import { COLOR_TEXT_DEFAULT, COLOR_BUTTON_DEFAULT } from 'styles/global.style';
import { Text } from 'react-native-elements';
import { wp, hp } from 'utils/responsive';
import { AuthContext, getProfile } from 'store/context/auth';
import { useTranslation } from 'react-i18next';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { axios } from 'utils/api';
import { FormikHelpers, Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import ItemProfile from './ItemProfile';
import ButtonOriginal from 'components/Utils/ButtonOriginal';
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
  const inputNameRef = useRef<any>(null);
  const { state, dispatch } = useContext(AuthContext);
  const { token, profile, languageStatus } = state;
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [selected, setSelected] = useState(profile.gender);
  useEffect(() => {
    getProfile(token, dispatch, languageStatus);
  }, []);
  const handleChangeGender = (itemValue: any, itemIndex: number) => {
    setSelected(itemValue);
  };
  const handleClickSubmit = async (
    values: ProfileValues,
    actions: FormikHelpers<ProfileValues>,
  ) => {
    if (!values.name) {
      //   toastRef.current.show(t('account:profile:emptyNameEdit'), 1000);
    } else if (!values.email) {
      //   toastRef.current.show(t('account:profile:emptyEmailEdit'), 1000);
    } else if (!values.phone) {
      //   toastRef.current.show(t('account:profile:emptyPhoneEdit'), 1000);
    } else {
      setLoadingSubmit(true);

      const body = { ...values, gender: selected };

      try {
        await axios.put('profile', body, {
          headers: { Authorization: token, 'Accept-Language': languageStatus },
        });

        setLoadingSubmit(false);
        // toastRef.current.show(t('account:profile:updateSuccess'), 500, () => {
        //   navigation.goBack();
        // });
        getProfile(token, dispatch, languageStatus);
      } catch (error) {
        setLoadingSubmit(false);
        // toastRef.current.show(t('account:profile:updateError'), 1500);
      }
    }
  };

  return (
    <View style={styles.container}>
      <HeaderWithBackTitle title={'Edit Profile'} textHeaderStyle={{ color: COLOR_TEXT_DEFAULT }} />
      <ScrollView style={styles.scrollView}>
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
            {({
              handleChange,
              values,
              handleBlur,
              handleSubmit,
              isSubmitting,
              errors,
              touched,
            }) => (
              <KeyboardAwareScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                  style={{ flex: 1, paddingHorizontal: wp('5%') }}
                  activeOpacity={1}
                  onPress={Keyboard.dismiss}>
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

                  <View style={styles.item}>
                    <View style={styles.name}>
                      <TextInput
                        underlineColorAndroid="transparent"
                        style={styles.textInput}
                        placeholder={t('account:profile:fullName')}
                        onChangeText={handleChange('name')}
                        value={values.name}
                        onBlur={handleBlur('name')}
                        ref={inputNameRef}
                      />
                      <IconAntDesign
                        onPress={() => inputNameRef.current.focus()}
                        name="edit"
                        size={wp('5%')}
                        color={COLOR_BUTTON_DEFAULT}
                      />
                    </View>
                  </View>

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

                  <View style={styles.viewButton}>
                    <ButtonOriginal
                      title={t('account:profile:save')}
                      width={wp('85%')}
                      loading={loadingSubmit}
                      handlePress={handleSubmit}
                    />
                  </View>
                </TouchableOpacity>
              </KeyboardAwareScrollView>
            )}
          </Formik>
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
  item: {
    marginTop: hp('3%'),
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

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
    height: hp('5.5%'),
    paddingHorizontal: wp('2%'),
  },
  textInput: {
    width: '90%',
    height: '100%',
    fontSize: wp('4%'),
    fontWeight: '400',
    color: COLOR_TEXT_DEFAULT,
    paddingLeft: 0,
    fontFamily: 'Montserrat-Regular',
  },
  picker: {
    height: hp('7.5%'),
    width: wp('40%'),
  },
});
EditProfile.defaultProps = {};
export default withNavigation(EditProfile);
