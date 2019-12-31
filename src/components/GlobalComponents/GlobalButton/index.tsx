import React, { FC, ReactNode } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { BUTTON_TYPE, LIGHT, SIZE_TEXT_TITLE_MEDIUM } from 'styles/global.style';
import { wp, hp } from 'utils/responsive';
// interface IProps extends TouchableWithoutFeedbackProperties {
interface IProps {
  title: string;
  icon?: ReactNode;
  _onPress: (item?: any) => any;
  _onLongPress?: (item?: any) => any;
  width?: number,
  height?: number,
  buttonType: 'info' | 'danger' | 'success' | 'warning' | 'normal' | 'none',
  buttonContainerStyle?: Object;
  textStyle?: Object;
};

const GlobalButton: FC<IProps> = (props) => {
  const { title, icon, _onPress, _onLongPress, buttonType, width, buttonContainerStyle, height, textStyle } = props;

  const styles = StyleSheet.create({
    buttonContainer: {
      height: height || hp('4.5%'),
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width: width || wp('100%'),
      backgroundColor: BUTTON_TYPE[buttonType].background
    },
    buttonTextContainer: {
      paddingHorizontal: 4,
    },
    textTitle: {
      fontWeight: LIGHT,
      fontSize: SIZE_TEXT_TITLE_MEDIUM,
      color: BUTTON_TYPE[buttonType].text
    },
    iconContainer: {
    },
  });

  return (
    <TouchableWithoutFeedback
      onPress={_onPress}
      onLongPress={_onLongPress}
    >
      <View style={[styles.buttonContainer, buttonContainerStyle]}>
        <View style={styles.buttonTextContainer}>
          <Text style={[styles.textTitle, textStyle]}>{title}</Text>
        </View>
        {/* {icon} */}
      </View>
    </TouchableWithoutFeedback>
  );
};

GlobalButton.defaultProps = {

}
export default GlobalButton;
