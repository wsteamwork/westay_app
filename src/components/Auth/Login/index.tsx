import React, { FC, useRef, useContext, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import ButtonOriginal from 'components/Utils/ButtonOriginal';
import { hp, wp, COLOR_BUTTON_DEFAULT } from 'utils/responsive';
import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import { COLOR_TEXT_DEFAULT } from 'styles/global.style';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { axios, TOKEN } from 'utils/api';
import storage from 'utils/storage';
import { AuthContext, getProfile } from 'store/context/auth';
import { Input } from 'react-native-elements';
import { inputContainerStyleGlobal } from 'utils/mixins';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-root-toast';
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
  const { languageStatus } = state;
  const { navigation } = props;
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
  });
  const handleClickSubmit = async (values: LoginValues, actions: FormikHelpers<LoginValues>) => {
    Keyboard.dismiss();
    const body = {
      username: values.email,
      password: values.password,
    };
    setLoading(true);
    try {
      axios.post('login', body).then((res) => {
        const data = res.data;
        setLoading(false);
        storage.save({
          key: TOKEN,
          data: data.access_token,
          expires: data.expires_in,
        });
        dispatch({ type: 'SET_TOKEN', payload: `Bearer ${data.access_token}` });
        getProfile(data.access_token, dispatch, languageStatus);
        navigation.navigate('Home');
      });
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
              <Text style={styles.titleText}>Log in</Text>
              <View style={styles.boxWrapper} collapsable={false}>
                <Input
                  ref={emailRef}
                  placeholder="Your Email"
                  keyboardType="email-address"
                  returnKeyType="next"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  errorMessage={errors.email}
                  onSubmitEditing={() => passwordRef.current.focus()}
                  autoCorrect={false}
                  inputContainerStyle={styles.inputContainerStyle}
                  containerStyle={styles.containerStyle}
                  errorStyle={{ color: 'red' }}
                />
                <Input
                  ref={passwordRef}
                  placeholder="Password"
                  keyboardType="default"
                  returnKeyType="done"
                  secureTextEntry={true}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  errorMessage={errors.password}
                  errorStyle={{ color: 'red' }}
                  inputContainerStyle={styles.inputContainerStyle}
                  containerStyle={styles.containerStyle}
                />
                <View style={styles.forgotPassword}>
                  <Text
                    style={{ fontSize: wp('4%'), color: '#8A8A8F' }}
                    onPress={() => navigation.navigate('ForgotPassword')}>
                    Forgot Password
                  </Text>
                </View>
                <ButtonOriginal title="Log in" handlePress={handleSubmit} loading={loading} />
                <View style={styles.action}>
                  <Text style={styles.titleSubText}>
                    <Text>Don’t have an account? </Text>
                    <Text onPress={() => navigation.navigate('Register')} style={styles.textSwitch}>
                      Sign up
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
    fontWeight: 'bold',
    fontSize: wp('8%'),
    width: wp('100%'),
    paddingHorizontal: wp('5%'),
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
  forgotPassword: {
    marginBottom: hp('3%'),
  },
  inputContainerStyle: inputContainerStyleGlobal,
  containerStyle: {
    marginBottom: hp('3%'),
  },
});
Login.defaultProps = {};
export default withNavigation(Login);
