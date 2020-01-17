import React, { FC, useContext, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import ButtonOriginal from 'components/Utils/ButtonOriginal';
import { hp, wp, COLOR_BUTTON_DEFAULT } from 'utils/responsive';
import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import { COLOR_TEXT_DEFAULT } from 'styles/global.style';
import InputFormGlobal from 'components/Utils/InputFormGlobal';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { axios, TOKEN } from 'utils/api';
import Toast from 'react-native-easy-toast';
import storage from 'utils/storage';
import { AuthContext } from 'store/context/auth';
import { Input } from 'react-native-elements';
import { inputContainerStyleGlobal } from 'utils/mixins';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}
interface RegisterValues {
  email: string;
  password: string;
  passwordConfirm: string;
}

const Register: FC<IProps> = (props) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const rePasswordRef = useRef(null);
  const toastRef = useRef(null);
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
        dispatch({ type: 'SET_TOKEN', payload: `Bearer ${data.access_token}` });
        navigation.navigate('Login');
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.data.data.errors.email) {
          // toastRef.current.show(err.response.data.data.errors.email[0], 1500);
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
              <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                {/* <Toast ref={toastRef} /> */}
                <View style={styles.container} collapsable={false}>
                  <HeaderWithBackTitle handlePress={() => navigation.goBack()} />
                  <Text style={styles.titleText}>Sign up</Text>
                  <Input
                    ref={emailRef}
                    placeholder="Your Email"
                    keyboardType="email-address"
                    returnKeyType="next"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    errorMessage={errors.email}
                    onSubmitEditing={() => (passwordRef as any).current.focus()}
                    autoCorrect={false}
                    inputContainerStyle={styles.inputContainerStyle}
                    containerStyle={styles.containerStyle}
                    errorStyle={{ color: 'red' }}
                  />
                  <Input
                    ref={passwordRef}
                    placeholder="Password"
                    keyboardType="default"
                    returnKeyType="next"
                    secureTextEntry={true}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    errorMessage={errors.password}
                    onSubmitEditing={() => (rePasswordRef as any).current.focus()}
                    errorStyle={{ color: 'red' }}
                    inputContainerStyle={styles.inputContainerStyle}
                    containerStyle={styles.containerStyle}
                  />
                  <Input
                    ref={rePasswordRef}
                    placeholder="Confirm Password"
                    keyboardType="default"
                    returnKeyType="done"
                    secureTextEntry={true}
                    value={values.passwordConfirm}
                    onChangeText={handleChange('passwordConfirm')}
                    onBlur={handleBlur('passwordConfirm')}
                    errorMessage={errors.passwordConfirm}
                    errorStyle={{ color: 'red' }}
                    inputContainerStyle={styles.inputContainerStyle}
                    containerStyle={styles.containerStyle}
                  />
                  <ButtonOriginal title="Sign up" customStyle={styles.signup} handlePress={handleSubmit} loading={loading} />
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
                    <Text style={styles.titleSubText}>
                      <Text>Already have account? </Text>
                      <Text onPress={() => navigation.navigate('Login')} style={styles.textSwitch}>
                        Log in
                      </Text>{' '}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    width: wp('100%'),
  },
  scrollView: {
    width: wp('100%'),
  },
  titleText: {
    marginBottom: hp('6%'),
    fontWeight: 'bold',
    fontSize: wp('8%'),
    width: wp('100%'),
    paddingHorizontal: wp('6%'),
    color: COLOR_TEXT_DEFAULT,
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
    marginBottom: hp('7%'),
  },
  termConditions: {
    fontSize: wp('4%'),
    color: '#0BBCF2',
    textAlign: 'center',
  },
  text: {
    fontSize: wp('4%'),
    width: wp('100%'),
    textAlign: 'center',
    color: '#8A8A8F',
  },
  signup: {
    marginTop: hp('3%'),
  },
  inputContainerStyle: inputContainerStyleGlobal,
  containerStyle: {
    marginBottom: hp('3%'),
  },
});
Register.defaultProps = {};
export default withNavigation(Register);
