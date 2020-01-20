import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import ButtonOriginal from 'components/Utils/ButtonOriginal';
import { Formik, FormikHelpers } from 'formik';
import React, { FC, useContext, useRef, useState } from 'react';
import { Keyboard, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from 'store/context/auth';
import { Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { inputContainerStyleGlobal } from 'utils/mixins';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { axios } from 'utils/api';
import { COLOR_BUTTON_DEFAULT, hp, wp } from 'utils/responsive';
import * as Yup from 'yup';
import { COLOR_TEXT_DEFAULT } from 'styles/global.style';
import Toast from 'react-native-root-toast';

interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}
interface LoginValues {
  email: string;
}

const ForgotPassword: FC<IProps> = (props) => {
  const emailRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { navigation } = props;
  const { state } = useContext(AuthContext);
  const { languageStatus } = state;
  const FormValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Vui lòng nhập email')
      .email('Địa chỉ email không hợp lệ')
      .min(6, 'Tối thiểu 6 ký tự')
      .max(255, 'Tối đa 255 ký tự'),
  });
  const handleClickSubmit = (values: LoginValues, actions: FormikHelpers<LoginValues>) => {
    Keyboard.dismiss();

    const body = {
      email: values.email,
    };

    axios
      .post('forget-password', body, {
        headers: { 'Accept-Language': languageStatus },
      })
      .then((res) => {
        const data = res.data;
        if (data) {
          Toast.show('An email has been sent to your e-mail address', {
            duration: Toast.durations.LONG,
            position: -60,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
          setLoading(false);
          navigation.goBack();
        }
      })
      .catch((err) => {
        setLoading(false);
        Toast.show(err.response.data.data.error, {
          duration: Toast.durations.LONG,
          position: -60,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      });
  };
  return (
    <Formik
      initialValues={{
        email: '',
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
              <View style={styles.container} collapsable={false}>
                <HeaderWithBackTitle handlePress={() => navigation.goBack()} />
                <Text style={styles.titleText}>Forgot Password</Text>
                <Text style={styles.titleSubText}>
                  Enter the email address registered with your account and we will send you a
                  password change link.
                </Text>
                <Input
                  ref={emailRef}
                  placeholder="Your Email"
                  keyboardType="email-address"
                  returnKeyType="done"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  errorMessage={errors.email}
                  autoCorrect={false}
                  inputContainerStyle={styles.inputContainerStyle}
                  containerStyle={styles.containerStyle}
                  errorStyle={{ color: 'red' }}
                />
                <ButtonOriginal
                  title="Send"
                  handlePress={handleSubmit}
                  loading={loading}
                  customStyle={styles.send}
                />
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    width: wp('100%'),
  },
  scrollView: {
    width: wp('100%'),
  },
  titleText: {
    marginBottom: hp('2%'),
    fontWeight: 'bold',
    fontSize: wp('8%'),
    width: wp('100%'),
    paddingHorizontal: wp('6%'),
    color: COLOR_TEXT_DEFAULT,
  },
  titleSubText: {
    marginBottom: hp('10%'),
    fontSize: wp('4%'),
    width: wp('90%'),
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
  send: {
    marginTop: hp('3%'),
  },
  inputContainerStyle: inputContainerStyleGlobal,
  containerStyle: {
    marginBottom: hp('3%'),
  },
});
ForgotPassword.defaultProps = {};
export default withNavigation(ForgotPassword);
