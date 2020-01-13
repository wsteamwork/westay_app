import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import ButtonOriginal from 'components/Utils/ButtonOriginal';
import InputFormGlobal from 'components/Utils/InputFormGlobal';
import { Formik, FormikHelpers } from 'formik';
import React, { FC, useContext, useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-easy-toast';
import { NavigationInjectedProps } from 'react-navigation';
import { AuthContext } from 'store/context/auth';
// import { AuthContext } from 'store/context/auth';
import { COLOR_TEXT_DEFAULT } from 'styles/global.style';
import { axios } from 'utils/api';
import { COLOR_BUTTON_DEFAULT, hp, wp } from 'utils/responsive';
import * as Yup from 'yup';

interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}
interface LoginValues {
  email: string;
}

const ForgotPassword: FC<IProps> = (props) => {
  const emailRef = useRef(null);
  const toastRef = useRef(null);
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

        // toastRef.current.show("An email has been sent to your e-mail address"), 1500, () => {
        //   setLoading(false);
        //   navigation.goBack();
        // }
      })
      .catch((err) => {
        setLoading(false);
        // toastRef.current.show(err.response.data.data.error, 1500);
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
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
              {/* <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}> */}
              <Toast ref={toastRef} />
              <View style={styles.container} collapsable={false}>
                <HeaderWithBackTitle />
                <Text style={styles.titleText}>Forgot Password</Text>
                <Text style={styles.titleSubText}>
                  Enter the email address registered with your account and we will send you a
                  password change link.
                  </Text>
                <InputFormGlobal
                  placeholder="Your Email"
                  keyboardType="email-address"
                  returnKeyType="done"
                  autoFocus={true}
                  ref={emailRef}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  errorMessage={errors.email}
                />
                <ButtonOriginal title="Send" handlePress={handleSubmit} loading={loading} />
              </View>
              {/* </TouchableWithoutFeedback> */}
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
});
ForgotPassword.defaultProps = {};
export default ForgotPassword;
