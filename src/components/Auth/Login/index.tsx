import React, {
  FC,
  useRef,
  createRef,
  useEffect,
  MutableRefObject,
  Ref,
  RefObject,
  useContext,
  useState,
} from 'react';
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
import storage from 'utils/storage';
import {AuthContext} from 'store/context/auth';
interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}
interface LoginValues {
  email: string;
  password: string;
}

const Login: FC<IProps> = (props) => {
  const emailRef = React.createRef();
  let passwordRef = React.createRef();
  const [loading, setLoading] = useState(false);
  const { dispatch, state } = useContext(AuthContext);
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
      axios.post('login', body).then(async (res) => {
        const data = res.data;
        setLoading(false);
        storage.save({
          key: TOKEN,
          data: data.access_token,
          expires: data.expires_in,
        });
        dispatch({ type: 'SET_TOKEN', payload: `Bearer ${data.access_token}` });
      });
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      // toastRef.current.show(error.response.data.data.errors[0], 1500);
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
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
              <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                <View style={styles.container} collapsable={false}>
                  <HeaderWithBackTitle handlePress={() => navigation.goBack()} />
                  <Text style={styles.titleText}>Log in</Text>
                  <InputFormGlobal
                    placeholder="Your Email"
                    keyboardType="email-address"
                    returnKeyType="next"
                    autoFocus={true}
                    ref={emailRef}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    errorMessage={errors.email}
                    // onSubmitEditing={() => (passwordRef as any).current.focus()}
                  />
                  <InputFormGlobal
                    placeholder="Password"
                    keyboardType="default"
                    secureTextEntry={true}
                    returnKeyType="done"
                    ref={passwordRef}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    // onSubmitEditing={() => (rePasswordRef as any).current.focus()}
                    errorMessage={errors.password}
                  />
                  <View style={styles.forgotPassword}>
                    <Text
                      style={{ fontSize: wp('4%'), color: '#8A8A8F' }}
                      onPress={() => navigation.navigate('ForgetPassword')}>
                      Forgot Password
                    </Text>
                  </View>
                  <ButtonOriginal title="Log in" handlePress={handleSubmit} loading={loading} />
                  <View style={styles.action}>
                    <Text style={styles.titleSubText}>
                      <Text>Don’t have an account? </Text>
                      <Text onPress={() => navigation.navigate('Signin')} style={styles.textSwitch}>
                        Sign up
                      </Text>{' '}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
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
    position: 'absolute',
    bottom: 100,
  },
  textSwitch: {
    fontSize: wp('4%'),
    color: COLOR_BUTTON_DEFAULT,
    paddingLeft: wp('14%'),
    fontWeight: 'bold',
  },
  forgotPassword: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
});
Login.defaultProps = {};
export default Login;
