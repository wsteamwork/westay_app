import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { wp } from 'utils/responsive';
import { useTranslation } from 'react-i18next';
import { Text, Input } from 'react-native-elements';
import { COLOR_TEXT_DEFAULT } from 'styles/global.style';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  label?: string;
  inputAdornedEnd?: string;
  onFocus?: any;
  onSubmitEditing?: any;
  onBlur?: any;
}

const InputMerchant: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const { label, inputAdornedEnd, onFocus, onSubmitEditing, onBlur } = props;
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Input
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        containerStyle={styles.containerStyle}
        rightIcon={
          <View style={styles.boxRight}>
            <Text style={styles.textRightIcon}>{inputAdornedEnd}</Text>
          </View>
        }
        rightIconContainerStyle={styles.rightIcon}
        keyboardType={'number-pad'}
        onBlur={onBlur}
        onFocus={onFocus}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: COLOR_TEXT_DEFAULT,
    fontWeight: '700',
    fontSize: wp('4.5%'),
  },
  inputContainerStyle: {
    borderColor: '#ededed',
    borderBottomWidth: 1.3,
  },
  containerStyle: {
    left: -10,
    width: wp('100%'),
  },
  inputStyle: {
    width: '100%',
    left: -5,
    fontSize: wp('4.5%'),
    color: COLOR_TEXT_DEFAULT,
  },
  boxRight: {
    width: 44,
  },
  rightIcon: {},
  textRightIcon: {
    color: COLOR_TEXT_DEFAULT,
    fontWeight: 'bold',
  },
});

export default InputMerchant;
