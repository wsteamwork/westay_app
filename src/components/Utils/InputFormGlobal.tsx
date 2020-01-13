import React, { FC, RefObject } from 'react';
import {
  StyleSheet,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  ReturnKeyTypeOptions,
  KeyboardTypeOptions,
  TextInputFocusEventData,
} from 'react-native';
import { wp } from './responsive.style';
import { Input } from 'react-native-elements';
import { hp } from 'utils/responsive';
interface IProps {
  width?: any;
  value?: string;
  onChangeText?: (text: string) => void;
  customStyle?: any;
  placeholder?: string;
  returnKeyType?: ReturnKeyTypeOptions;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoFocus?: boolean;
  onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  ref?: RefObject<any>;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void; 
  errorMessage?: string;
}
const InputFormGlobal: FC<IProps> = (props) => {
  const {
    onChangeText,
    value,
    placeholder,
    keyboardType,
    secureTextEntry,
    returnKeyType,
    autoFocus,
    onSubmitEditing,
    ref,
    onBlur,
    errorMessage
  } = props;
  return (
    <Input
      ref={ref}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      containerStyle={styles.containerStyle}
      inputContainerStyle={styles.inputContainerStyle}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      returnKeyType={returnKeyType}
      autoCorrect={false}
      autoFocus={autoFocus}
      onSubmitEditing={onSubmitEditing}
      onBlur={onBlur}
      errorMessage={errorMessage}
      errorStyle={{ color: 'red' }}
    />
  );
};

InputFormGlobal.defaultProps = {
  value: '',
  width: wp('80%'),
};

const styles = StyleSheet.create({
  containerStyle: {
    marginBottom: 20,
  },
  inputContainerStyle: {
    height: hp('7%'),
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

export default InputFormGlobal;
