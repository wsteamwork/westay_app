import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import ButtonOriginal from 'components/Utils/ButtonOriginal';
import { Formik, FormikHelpers } from 'formik';
import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, Picker, Platform, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { AuthContext, getProfile } from 'store/context/auth';
import { COLOR_BLUR_TEXT, COLOR_BUTTON_DEFAULT, COLOR_TEXT_DEFAULT, COLOR_TEXT_SUBTITLE, COLOR_TEXT_TITLE, COLOR_URL_TEXT, LIGHT, SEMI_BOLD, SIZE_TEXT_SUBTITLE } from 'styles/global.style';
import { axios } from 'utils/api';
import { hp, wp } from 'utils/responsive';
import ItemProfile from './ItemProfile';

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
  const inputNameRef = useRef<any>(null);
  const { state, dispatch } = useContext(AuthContext);
  const { token, profile, languageStatus } = state;
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [tempQuantity, setTempQuantity] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    getProfile(token, dispatch, languageStatus);
  }, []);
  const handleChangeGender = (itemValue: any, itemIndex: number) => {
    setSelected(itemValue);
  };

  const chooseQuantity = () => {
    setQuantity(tempQuantity);
    setOpenDrawer(false);
  }

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
    <SafeAreaView style={styles.container}>
      <HeaderWithBackTitle title={t('account:profile:name')} textHeaderStyle={{ color: COLOR_TEXT_DEFAULT }} />
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
                    onPress={Keyboard.dismiss}
                  >
                    <View style={styles.viewItem}>
                      <Text style={styles.title}>{t('account:profile:information')}</Text>
                      <Text style={styles.description}>{t('account:profile:descriptionInfo')}</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={() => setOpenDrawer(true)} style={[styles.item, styles.picker]}>
                      <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', flex: 1, borderRadius: 4 }}>
                        <Text>{quantity}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    {
                      Platform.OS === 'ios' ? (
                        <Modal
                          isVisible={openDrawer}
                          style={{ justifyContent: 'flex-end', margin: 0 }}
                          onSwipeComplete={() => setOpenDrawer(false)}
                          swipeDirection={['down']}
                          onBackdropPress={() => setOpenDrawer(false)}
                        >
                          <View style={styles.drawerBottomContainer}>
                            <View style={styles.innerContainer}>
                              <View style={styles.headerBarContainer}>
                                <TouchableWithoutFeedback onPress={() => setOpenDrawer(false)} style={styles.modalButton}>
                                  <View>
                                    <Text style={styles.buttonText} >{t('shared:cancel')}</Text>
                                  </View>
                                </TouchableWithoutFeedback>
                                <View style={styles.titleContainer}>
                                  <Text style={styles.titleText}>{t('account:profile:sex')}</Text>
                                </View>
                                <TouchableWithoutFeedback onPress={() => chooseQuantity()} style={styles.modalButton}>
                                  <View>
                                    <Text style={styles.buttonText}>{t('account:profile:save')}</Text>
                                  </View>
                                </TouchableWithoutFeedback>
                              </View>
                              <View style={styles.pickerContainer}>
                                <Picker
                                  style={{
                                    height: hp('35%')
                                  }}
                                  itemStyle={{ height: hp('35%') }}
                                  selectedValue={tempQuantity}
                                  onValueChange={(itemValue, itemIndex) =>
                                    setTempQuantity(itemValue)
                                  }>
                                  <Picker.Item label={t('account:profile:mr')} value={1} />
                                  <Picker.Item label={t('account:profile:mrs')} value={2} />
                                  <Picker.Item label={t('account:profile:unknown')} value={0} />
                                  <Picker.Item label={t('account:profile:other')} value={4} />
                                </Picker>
                              </View>
                            </View>
                          </View>
                        </Modal>
                      ) : (null)
                    }

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    marginTop: hp('3%'),
    // flex: 1,
    backgroundColor: 'white',
    borderRadius: 4,
    // padding: 8,
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
  textInput: {
    width: '90%',
    height: '100%',
    fontSize: wp('4%'),
    fontWeight: '400',
    color: COLOR_TEXT_DEFAULT,
    paddingLeft: 0,
    // fontFamily: Platform.OS === 'android' ?? 'Montserrat-Regular',
  },
  picker: {
    height: 42,
    borderWidth: 0.5,
    borderColor: COLOR_BLUR_TEXT,
    width: wp('40%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.1,

    elevation: 2,
  },
  iosSelectContainer: {
    borderColor: '#767676',
    // borderWidth: 0.5,
    // borderRadius: 6,
    marginHorizontal: 6,
    backgroundColor: 'white'
  },
  iosSelectInner: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: 'row'
  },
  iosSelectValue: {
    paddingHorizontal: 6,
    fontSize: SIZE_TEXT_SUBTITLE,
    fontWeight: SEMI_BOLD,
    color: COLOR_TEXT_TITLE
  },
  iosSelectLabel: {
    color: COLOR_TEXT_SUBTITLE,
    fontSize: SIZE_TEXT_SUBTITLE,
    fontWeight: LIGHT
  },
  iosSelectIcon: {
    alignSelf: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 6,
    flex: 1
  },
  headerBarContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 45,
    padding: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#7676762d'
  },
  drawerBottomContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: 'white',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    height: hp('35%')
  },
  innerContainer: {
    flex: 1,
    width: wp('100%')
  },
  pickerContainer: {
    flex: 1,
    width: wp('100%')
  },
  titleContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12
  },
  buttonText: {
    fontSize: SIZE_TEXT_SUBTITLE,
    color: COLOR_URL_TEXT
  },
  titleText: {
    color: COLOR_TEXT_TITLE
  },
});
EditProfile.defaultProps = {};
export default withNavigation(EditProfile);
