import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import ButtonOriginal from 'components/Utils/ButtonOriginal';
import { Formik, FormikHelpers } from 'formik';
import React, { FC, useContext, useRef, useState } from 'react';
import { Keyboard, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-root-toast';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { AuthContext, getProfile } from 'store/context/auth';
import { COLOR_TEXT_SUBTITLE, COLOR_TEXT_TITLE, SIZE_TEXT_SUBTITLE } from 'styles/global.style';
import { axios, TOKEN } from 'utils/api';
import { inputContainerStyleGlobal } from 'utils/mixins';
import { COLOR_BUTTON_DEFAULT, hp, wp } from 'utils/responsive';
import storage from 'utils/storage';
import * as Yup from 'yup';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}
interface RegisterValues {
  email: string;
  password: string;
  passwordConfirm: string;
}

const Register: FC<IProps> = (props) => {
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const rePasswordRef = useRef<any>(null);
  const { navigation } = props;
  const { dispatch, state } = useContext(AuthContext);
  const { languageStatus } = state;
  const [loading, setLoading] = useState(false);
  const FormValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Vui lòng nhập email')
      .email('Địa chỉ email không hợp lệ')
      .min(6, 'Tối thiểu 6 ký tự')
      .max(255, 'Tối đa 255 ký tự'),
    password: Yup.string()
      .required('Vui lòng nhập mật khẩu')
      .min(6, 'Tối thiếu 6 ký tự')
      .max(255, 'Tối đa 255 ký tự'),
    passwordConfirm: Yup.string()
      .required('Nhập lại mật khẩu')
      .min(6, 'Tối thiếu 6 ký tự')
      .max(255, 'Tối đa 255 ký tự')
      .oneOf([Yup.ref('password')], 'Mật khẩu không trùng khớp'),
  });
  const handleClickSubmit = async (
    values: RegisterValues,
    actions: FormikHelpers<RegisterValues>,
  ) => {
    Keyboard.dismiss();
    const body = {
      email: values.email,
      password: values.password,
      password_confirmation: values.passwordConfirm,
      type: 0,
    };
    setLoading(true);

    await axios
      .post('register', body, {
        headers: { 'Accept-Language': languageStatus },
      })
      .then(async (res) => {
        const data = res.data;
        setLoading(false);
        storage.save({
          key: TOKEN,
          data: data.access_token,
          expires: data.expires_in,
        });
        Toast.show('Đăng ký thành công !', {
          duration: Toast.durations.LONG,
          position: -60,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        dispatch({ type: 'SET_TOKEN', payload: `Bearer ${data.access_token}` });
        getProfile(data.access_token, dispatch, languageStatus);
        navigation.navigate('Home');
      })
      .catch((err) => {
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
      });
  };
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        passwordConfirm: '',
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
              <Text style={styles.titleText}>Sign up</Text>
              <View style={styles.boxWrapper} collapsable={false}>
                <Input
                  ref={emailRef}
                  placeholderTextColor={`${COLOR_TEXT_SUBTITLE}7d`}
                  placeholder="Your Email"
                  keyboardType="email-address"
                  returnKeyType="next"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  errorMessage={errors.email}
                  onSubmitEditing={() => passwordRef.current.focus()}
                  autoCorrect={false}
                  inputStyle={{ fontSize: SIZE_TEXT_SUBTITLE, color: COLOR_TEXT_TITLE }}
                  inputContainerStyle={styles.inputContainerStyle}
                  containerStyle={styles.containerStyle}
                  errorStyle={{ color: 'red' }}
                />
                <Input
                  ref={passwordRef}
                  placeholderTextColor={`${COLOR_TEXT_SUBTITLE}7d`}
                  placeholder="Password"
                  keyboardType="default"
                  returnKeyType="next"
                  secureTextEntry={true}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  errorMessage={errors.password}
                  onSubmitEditing={() => rePasswordRef.current.focus()}
                  errorStyle={{ color: 'red' }}
                  inputStyle={{ fontSize: SIZE_TEXT_SUBTITLE, color: COLOR_TEXT_TITLE }}
                  inputContainerStyle={styles.inputContainerStyle}
                  containerStyle={styles.containerStyle}
                />
                <Input
                  ref={rePasswordRef}
                  placeholderTextColor={`${COLOR_TEXT_SUBTITLE}7d`}
                  placeholder="Confirm Password"
                  keyboardType="default"
                  returnKeyType="done"
                  secureTextEntry={true}
                  value={values.passwordConfirm}
                  onChangeText={handleChange('passwordConfirm')}
                  onBlur={handleBlur('passwordConfirm')}
                  errorMessage={errors.passwordConfirm}
                  errorStyle={{ color: 'red' }}
                  inputStyle={{ fontSize: SIZE_TEXT_SUBTITLE, color: COLOR_TEXT_TITLE }}
                  inputContainerStyle={styles.inputContainerStyle}
                  containerStyle={styles.containerStyle}
                />
                <ButtonOriginal
                  title="Sign up"
                  customTitleStyle={{ fontSize: 16 }}
                  customStyle={styles.signup}
                  handlePress={handleSubmit}
                  loading={loading}
                />
                <View style={styles.policy}>
                  <Text style={styles.text}>By signing up, you agreed with our</Text>
                  <Text
                    style={styles.termConditions}
                    onPress={() => navigation.navigate('TermsAndConditions')}>
                    Terms and Conditions
                    <Text style={styles.text}> for Westay.</Text>
                  </Text>
                </View>
                <View style={styles.action}>
                  <Text style={styles.titleSubText} onPress={() => navigation.navigate('Login')}>
                    <Text>Already have account? </Text>
                    <Text style={styles.textSwitch} >
                      Log in
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
    paddingLeft: wp('14%'),
    fontWeight: 'bold',
  },
  policy: {
    marginTop: hp('4%'),
  },
  termConditions: {
    fontSize: SIZE_TEXT_SUBTITLE,
    color: '#0BBCF2',
    textAlign: 'center',
  },
  text: {
    fontSize: SIZE_TEXT_SUBTITLE,
    width: wp('100%'),
    textAlign: 'center',
    color: '#8A8A8F',
  },
  signup: {
    padding: 0,
    height: 42,
    marginTop: hp('3%')
  },
  inputContainerStyle: inputContainerStyleGlobal,
  containerStyle: {
    marginBottom: hp('3%'),
  },
});
Register.defaultProps = {};
export default withNavigation(Register);
