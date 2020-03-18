import React, {FC, useEffect, useMemo} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CreateListingLayout from 'components/Host/CreateListingLayout';
import {useTranslation} from 'react-i18next';
import {SIZE_TEXT_TITLE_MEDIUM, SIZE_TEXT_CONTENT} from 'styles/global.style';
import {Input} from 'react-native-elements';
import {stylesGlobal} from 'utils/responsive';
import {DetailsReducerAction} from 'store/redux/reducers/Merchant/CreateListing/Step2/details';
import {
  DescriptionReducerAction,
  getDetailDescriptionEN, getDetailDescription, handleTranslateToEnglish,
} from 'store/redux/reducers/Merchant/CreateListing/Step2/description';
import {useSelector, useDispatch} from 'react-redux';
import {ReducersList} from 'store/redux/reducers';
import {Dispatch} from 'redux';
import * as Yup from 'yup';
import {FormikProps, Formik} from 'formik';

interface IProps {

}

interface MyDescription {
  name: string;
  description: string;
  space: string;
  rules: string;
}

const useValidatation = () => {
  const {t} = useTranslation();

  const FormValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('create_details:requiredName'))
      .min(10, t('create_details:name10Character'))
      .max(100, t('create_details:name100Character')),
    description: Yup.string()
      .required(t('create_details:requiredDes'))
      .min(50, t('create_details:des50Character'))
      .max(5000, t('create_details:des5000Character')),
    space: Yup.string().max(5000, t('create_details:space5000Character')),
    rules: Yup.string().max(5000, t('create_details:rules5000Character')),
  });

  return FormValidationSchema;
};

const Tab1_Description: FC<IProps> = (props) => {
  const {}                   = props;
  const {t}                  = useTranslation();
  const FormValidationSchema = useValidatation();
  const name                 = useSelector<ReducersList, string>((state) => state.description.name);
  const description          = useSelector<ReducersList, string>((state) => state.description.description);
  const space                = useSelector<ReducersList, string>((state) => state.description.space);
  const rules                = useSelector<ReducersList, string>((state) => state.description.rules);
  const dispatch_des         = useDispatch<Dispatch<DescriptionReducerAction>>();
  const dispatch_detail      = useDispatch<Dispatch<DetailsReducerAction>>();
  const id                   = 12786;

  useEffect(() => {
    dispatch_detail({type: 'setStep', payload: 'tab1'});
  }, []);

  useEffect(() => {
    dispatch_detail({type: 'setDisableNext', payload: name.length < 5});
    dispatch_detail({type: 'setDisableNext', payload: description.length < 50});
  }, [name, description]);

  const handleSubmitForm: any = () => {
    return {};
  };

  const formikInit: MyDescription = useMemo<MyDescription>(() => {
    return {
      name: name,
      description: description,
      space: space,
      rules: rules,
    };
  }, [name, description, space, rules]);

  const dispatchDescription = (typeAction: any, value: string) => {
    dispatch_des({type: typeAction.type, payload: value});
  };

  useEffect(() => {
    getDetailDescription(id, dispatch_des);
    getDetailDescriptionEN(id, dispatch_des);
  }, [id]);

  return (
    <Formik
      enableReinitialize = {true}
      validateOnChange = {true}
      validationSchema = {FormValidationSchema}
      initialValues = {formikInit}
      onSubmit = {handleSubmitForm}>
      {({
          values,
          handleSubmit,
          touched,
          errors,
          handleChange,
          handleBlur,
        }: FormikProps<MyDescription>) => {
        return (
          <CreateListingLayout titleHeader = {t('create_details:titleStep')} titleMain = {t('create_basic:tab1')}>
            <View style = {styles.row}>
              <Text style = {styles.txtTitle}>{t('create_details:listingName')}</Text>
              <Text style = {styles.txtSubTitle}>{t('create_details:subName')}</Text>
              <Input
                inputStyle = {{fontSize: SIZE_TEXT_TITLE_MEDIUM}}
                containerStyle = {styles.containerInput}
                errorStyle = {{color: 'tomato'}}
                autoCorrect = {false}
                placeholder = {t('create_details:name10Character')}
                errorMessage = {errors.name}
                underlineColorAndroid = 'transparent'
                multiline
                numberOfLines = {3}
                maxLength = {100}
                value = {values.name}
                onChangeText = {value => {
                  handleChange(value);
                  // dispatchDescription({type: 'setName'}, value);
                  // handleTranslateToEnglish(value).then((res) => {
                  //   dispatchDescription({type: 'setNameEN'}, res);
                  // });
                }}
                onBlur={e => {}}
              />
            </View>
            <View style = {styles.row}>
              <Text style = {styles.txtTitle}>{t('create_details:listingDes')}</Text>
              <Text style = {styles.txtSubTitle}>{t('create_details:subDes')}</Text>
              <Input
                inputStyle = {{fontSize: SIZE_TEXT_TITLE_MEDIUM}}
                containerStyle = {styles.containerInput}
                errorStyle = {{color: 'tomato'}}
                autoCorrect = {false}
                placeholder = {t('create_basic:des5000Character')}
                // errorMessage='ENTER A VALID ERROR HERE'
                underlineColorAndroid = 'transparent'
                multiline
                numberOfLines = {5}
                maxLength = {100}
              />
            </View>

            <View>
              <Text style = {stylesGlobal.bigTitle}>{t('create_details:addMoreInfo')}</Text>

              <View style = {styles.row}>
                <Text style = {styles.txtTitle}>{t('create_details:listingSpace')}</Text>
                <Text style = {styles.txtSubTitle}>{t('create_details:subSpace')}</Text>
                <Input
                  inputStyle = {{fontSize: SIZE_TEXT_TITLE_MEDIUM}}
                  containerStyle = {styles.containerInput}
                  errorStyle = {{color: 'tomato'}}
                  autoCorrect = {false}
                  placeholder = {t('create_basic:des5000Character')}
                  // errorMessage='ENTER A VALID ERROR HERE'
                  underlineColorAndroid = 'transparent'
                  multiline
                  numberOfLines = {5}
                  maxLength = {100}
                />
              </View>

              <View style = {styles.row}>
                <Text style = {styles.txtTitle}>{t('create_details:listingRules')}</Text>
                <Text style = {styles.txtSubTitle}>{t('create_details:subRules')}</Text>
                <Input
                  inputStyle = {{fontSize: SIZE_TEXT_TITLE_MEDIUM}}
                  containerStyle = {styles.containerInput}
                  errorStyle = {{color: 'tomato'}}
                  autoCorrect = {false}
                  placeholder = {t('create_basic:des5000Character')}
                  // errorMessage='ENTER A VALID ERROR HERE'
                  underlineColorAndroid = 'transparent'
                  multiline
                  numberOfLines = {5}
                  maxLength = {100}
                />
              </View>
            </View>
          </CreateListingLayout>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  txtTitle: {
    fontSize: 18,
    marginBottom: 6,
  },
  row: {
    marginBottom: 32,
  },
  txtSubTitle: {
    fontSize: SIZE_TEXT_CONTENT,
  },
  containerInput: {
    marginTop: 12,
    borderRadius: 6,
    width: '100%',
    backgroundColor: '#fafafa',
  },
});

export default Tab1_Description;
