import React, { FC, useRef, useState, useContext, useEffect, useMemo } from 'react';
import { View, StyleSheet, SafeAreaView, Keyboard } from 'react-native';
import { hp, wp } from 'utils/responsive';
import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import ButtonOriginal from 'components/Utils/ButtonOriginal';
import { NavigationInjectedProps, withNavigation, ScrollView } from 'react-navigation';
import { Formik, FormikHelpers } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, Input } from 'react-native-elements';
import * as Yup from 'yup';
import { inputContainerStyleGlobal } from 'utils/mixins';
import { COLOR_BUTTON_DEFAULT, COLOR_TEXT_DEFAULT, COLOR_TITLE_HEADER } from 'styles/global.style';
// @ts-ignore
import RadioGroup from 'react-native-radio-buttons-group';
import { AuthContext, getProfile } from 'store/context/auth';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';
import { WEBSITE_SRC } from 'types/globalTypes';
import { createLTBooking } from 'store/redux/reducers/LTBooking/ltbooking';
interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}
interface CustomerValues {
  name: string;
  email: string;
  phone: string;
  others: string;
}

const BoxCustomerInformation: FC<IProps> = (props) => {
  const { navigation } = props;
  const nameRef = useRef<any>(null);
  const emailRef = useRef<any>(null);
  const phoneRef = useRef<any>(null);
  const othersRef = useRef<any>(null);
  const { state, dispatch } = useContext(AuthContext);
  const { roomId, movein, moveout, numberOfGuests } = useSelector<ReducersList, any>(
    (state) => state.ltbooking,
  );
  const { token, profile, languageStatus } = state;
  useEffect(() => {
    getProfile(token, dispatch, languageStatus);
  }, []);
  const [data, setData] = useState<any>([
    {
      label: 'Chuyển khoản trực tiếp',
      color: COLOR_TITLE_HEADER,
      selected: true,
      value: 1,
    },
    {
      label: 'Thanh toán qua Bảo Kim',
      color: COLOR_TITLE_HEADER,
      selected: false,
      value: 2,
    },
  ]);
  const onChoosePayment = (data: any) => {
    setData(data);
  };
  const handleClickSubmit = async (
    values: CustomerValues,
    actions: FormikHelpers<CustomerValues>,
  ) => {
    Keyboard.dismiss();
    let selectedButton = data.find((e: any) => e.selected == true);
    let selected = selectedButton ? selectedButton.value : 1;
    const dataBooking = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      long_term_room_id: roomId,
      move_in: movein,
      move_out: moveout,
      guests: {
        total_guests: numberOfGuests,
      },
      note: values.others,
      source: WEBSITE_SRC,
    };
    try {
      const res = await createLTBooking(dataBooking);
      if (res) {
        if (selected === 2) {
          navigation.navigate('BoxPaymentBaoKim', { dataBooking: res });
        } else {
          navigation.navigate('BoxDirectTransfer', { dataBooking: res });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formikInit: CustomerValues = useMemo<CustomerValues>(() => {
    return {
      name: profile && profile.name ? profile.name : '',
      email: profile && profile.email ? profile.email : '',
      phone: profile && profile.phone ? profile.phone : '',
      others: '',
    };
  }, [profile]);

  const FormValidationSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập tên bạn'),
    email: Yup.string()
      .required('Vui lòng nhập email')
      .email('Địa chỉ email không hợp lệ')
      .min(6, 'Tối thiểu 6 ký tự')
      .max(255, 'Tối đa 255 ký tự'),
    phone: Yup.string()
      .required('Vui lòng nhập số điện thoại')
      .min(9, 'Tối thiểu 9 ký tự')
      .max(12, 'Tối đa 12 ký tự'),
  });

  return (
    <Formik
      initialValues={formikInit}
      onSubmit={handleClickSubmit}
      validationSchema={FormValidationSchema}
      validateOnChange={false}>
      {({ handleChange, values, handleBlur, handleSubmit, errors }) => {
        return (
          <View style={styles.container}>
            <ScrollView>
              <SafeAreaView>
                <KeyboardAwareScrollView
                  style={styles.scrollView}
                  enableOnAndroid
                  extraHeight={50}
                  showsVerticalScrollIndicator={false}>
                  <View collapsable={false}>
                    <HeaderWithBackTitle handlePress={() => navigation.goBack()} />
                    <Text style={styles.titleText}>Customer Information</Text>
                    <Input
                      ref={nameRef}
                      placeholder="Customer name"
                      returnKeyType="next"
                      value={values.name}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      errorMessage={errors.name}
                      onSubmitEditing={() => emailRef.current.focus()}
                      autoCorrect={false}
                      inputContainerStyle={styles.inputContainerStyle}
                      containerStyle={styles.containerStyle}
                      errorStyle={{ color: 'red' }}
                    />
                    <Input
                      ref={emailRef}
                      placeholder="Email"
                      keyboardType="email-address"
                      returnKeyType="next"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      errorMessage={errors.email}
                      onSubmitEditing={() => phoneRef.current.focus()}
                      autoCorrect={false}
                      inputContainerStyle={styles.inputContainerStyle}
                      containerStyle={styles.containerStyle}
                      errorStyle={{ color: 'red' }}
                    />
                    <Input
                      ref={phoneRef}
                      placeholder="Phone"
                      keyboardType="phone-pad"
                      returnKeyType="next"
                      value={values.phone}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      errorMessage={errors.phone}
                      onSubmitEditing={() => othersRef.current.focus()}
                      autoCorrect={false}
                      inputContainerStyle={styles.inputContainerStyle}
                      containerStyle={styles.containerStyle}
                      errorStyle={{ color: 'red' }}
                    />
                    <Input
                      ref={othersRef}
                      multiline={true}
                      numberOfLines={1}
                      placeholder="Other requirements"
                      returnKeyType="done"
                      value={values.others}
                      onChangeText={handleChange('others')}
                      onBlur={handleBlur('others')}
                      errorMessage={errors.others}
                      autoCorrect={false}
                      inputContainerStyle={styles.inputContainerMuiltiStyle}
                      containerStyle={styles.containerStyle}
                      errorStyle={{ color: 'red' }}
                    />
                    <Text style={styles.titlePayment}>Choose one payment method</Text>
                    <View style={styles.radioGroup}>
                      <RadioGroup radioButtons={data} onPress={onChoosePayment} />
                    </View>
                  </View>
                </KeyboardAwareScrollView>
              </SafeAreaView>
            </ScrollView>

            <View style={styles.boxButton}>
              <ButtonOriginal
                title="Pay now"
                handlePress={handleSubmit}
                customStyle={styles.buttonStyle}
              />
            </View>
          </View>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp('4%'),
    backgroundColor: '#ffffff',
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
    paddingHorizontal: wp('3%'),
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
  titleStyle: {
    color: 'red',
    fontWeight: '500',
    marginRight: 3,
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
  titlePayment: {
    marginBottom: hp('1%'),
    fontWeight: 'bold',
    fontSize: wp('5%'),
    width: wp('100%'),
    paddingHorizontal: wp('5%'),
    color: COLOR_TEXT_DEFAULT,
  },
  radioGroup: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: wp('3%'),
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
    marginBottom: hp('5%'),
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
    marginBottom: hp('4%'),
    paddingHorizontal: wp('5%'),
  },
  inputContainerMuiltiStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 16,
    elevation: 10,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
export default withNavigation(BoxCustomerInformation);
