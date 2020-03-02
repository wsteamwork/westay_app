import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import ButtonOriginal from 'components/Utils/ButtonOriginal';
import { Formik, FormikHelpers } from 'formik';
import React, { FC, useContext, useRef, useState } from 'react';
import { Keyboard, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-root-toast';
import {useTranslation} from 'react-i18next';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { asyncLogin } from 'store/actions/asyncLogin';
import { AuthContext } from 'store/context/auth';
import { COLOR_TEXT_SUBTITLE, COLOR_TEXT_TITLE } from 'styles/global.style';
import { inputContainerStyleGlobal } from 'utils/mixins';
import { COLOR_BUTTON_DEFAULT, hp, wp } from 'utils/responsive';
import * as Yup from 'yup';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}
interface LoginValues {
  email: string;
  password: string;
}

const Login: FC<IProps> = (props) => {
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const { dispatch, state } = useContext(AuthContext);
  const { languageStatus, fcmToken } = state;
  const { navigation } = props;
  const { t } = useTranslation();

  const FormValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t('auth:login:emailRequired'))
      .email(t('auth:login:invalidEmail'))
      .min(6, t('auth:login:min6Character'))
      .max(255, t('auth:login:max255Character')),
    password: Yup.string()
      .required(t('auth:login:passwordRequired'))
      .min(6, t('auth:login:min6Character'))
      .max(255, t('auth:login:max255Character')),
  });


  const handleClickSubmit = async (values: LoginValues, actions: FormikHelpers<LoginValues>) => {
    Keyboard.dismiss();
    const body = {
      username: values.email,
      password: values.password,
    };
    setLoading(true);
    try {
      await asyncLogin(body, dispatch, fcmToken, languageStatus);

      setLoading(false);
      navigation.goBack();
    } catch (err) {
      setLoading(false);
      if (err.response.data.data.errors.email) {
        Toast.show(err.response.data.data.errors.email[0], {
          duration: Toast.durations.LONG,
          position: -60,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      }
    }
  };
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={handleClickSubmit}
      validationSchema={FormValidationSchema}
      validateOnChange={false}>
      {({ handleChange, values, handleBlur, handleSubmit, errors }) => {
        return (
          <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView
              style={styles.scrollView}
              enableOnAndroid
              extraHeight={50}
              showsVerticalScrollIndicator={false}>
              <HeaderWithBackTitle handlePress={() => navigation.goBack()} />
              <Text style={styles.titleText}>{t('auth:login:name')}</Text>
              <View style={styles.boxWrapper} collapsable={false}>
                <Input
                  ref={emailRef}
                  placeholderTextColor={`${COLOR_TEXT_SUBTITLE}7d`}
                  placeholder={t('auth:login:labelEmail')}
                  keyboardType="email-address"
                  returnKeyType="next"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  errorMessage={errors.email}
                  onSubmitEditing={() => passwordRef.current.focus()}
                  autoCorrect={false}
                  inputStyle={{ fontSize: 14, color: COLOR_TEXT_TITLE }}
                  inputContainerStyle={styles.inputContainerStyle}
                  containerStyle={styles.containerStyle}
                  errorStyle={{ color: 'red' }}
                />
                <Input
                  ref={passwordRef}
                  placeholderTextColor={`${COLOR_TEXT_SUBTITLE}7d`}
                  placeholder={t('auth:login:password')}
                  keyboardType="default"
                  returnKeyType="done"
                  secureTextEntry={true}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  errorMessage={errors.password}
                  errorStyle={{ color: 'red' }}
                  inputStyle={{ fontSize: 14, color: COLOR_TEXT_TITLE }}
                  inputContainerStyle={styles.inputContainerStyle}
                  containerStyle={styles.containerStyle}
                />
                <ButtonOriginal customStyle={{
                  padding: 0,
                  height: 42,
                  marginTop: hp('3%')
                }} title="Log in" handlePress={handleSubmit} loading={loading} />

                <View style={styles.forgotPassword}>
                  <Text
                    style={{ fontSize: wp('4%'), color: '#8A8A8F' }}
                    onPress={() => navigation.navigate('ForgotPassword')}>
                    {t('auth:forgetPassword:name')}
                  </Text>
                </View>
                <ButtonOriginal title={t('auth:login:name')} handlePress={handleSubmit} loading={loading} />
                <View style={styles.action}>
                  <Text style={styles.titleSubText}>
                    <Text>{t('auth:login:notAccount')} </Text>
                    <Text onPress={() => navigation.navigate('Register')} style={styles.textSwitch}>
                      {t('auth:register:name')}
                    </Text>{' '}
                  </Text>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </SafeAreaView>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  boxWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    width: wp('100%'),
    backgroundColor: '#ffffff'
  },
  scrollView: {
    width: wp('100%'),
  },
  titleText: {
    marginBottom: hp('6%'),
    fontWeight: '500',
    fontSize: wp('7%'),
    width: wp('100%'),
    paddingHorizontal: wp('5%'),
    color: COLOR_TEXT_TITLE,
  },
  titleSubText: {
    marginTop: hp('4%'),
    fontSize: wp('4%'),
    width: wp('80%'),
    textAlign: 'center',
    color: '#8A8A8F',
  },
  action: {
    position: 'relative',
    bottom: 0,
  },
  textSwitch: {
    fontSize: wp('4%'),
    color: COLOR_BUTTON_DEFAULT,
    // paddingLeft: wp('14%'),
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: hp('3%'),
  },
  inputContainerStyle: inputContainerStyleGlobal,
  containerStyle: {
    marginBottom: hp('3%'),
  },
});
Login.defaultProps = {};
export default withNavigation(Login);
