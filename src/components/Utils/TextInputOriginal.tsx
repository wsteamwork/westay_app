import React, { FC } from 'react';
import { StyleSheet, TextInput,Text } from 'react-native';
import { wp, hp } from 'utils/responsive';
interface IProps {
  width?: any;
  value?: string;
  onChangeText?: any;
  customStyle?: any;
}
const TextInputOriginal: FC<IProps> = (props) => {
  const { onChangeText, value, width, customStyle } = props;
  return (
    <Text>dfadfasf</Text>
    // <TextInput
    //   style={[styles.inputStyle, { width }, customStyle]}
    //   onChangeText={onChangeText}
    //   value={value}
    // />
  );
};

TextInputOriginal.defaultProps = {
  value: '',
  width: wp('90%'),
};

const styles = StyleSheet.create({
  inputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default TextInputOriginal;
