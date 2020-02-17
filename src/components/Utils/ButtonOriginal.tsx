import React, { FC } from 'react';
import { StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { COLOR_LINEAR_DEFAULT } from './responsive.style';
import { wp, hp } from 'utils/responsive';
import TouchableWithScale from 'components/GlobalComponents/TouchableComponent/TouchableWithScale';
interface IProps {
  handlePress?: any;
  width?: number | string;
  height?: number | string;
  title?: string;
  loading?: boolean;
  customStyle?: any;
  icon?: any;
  iconRight?: boolean;
  useViewComponent?: boolean;
  disabled?: boolean;
}
const ButtonOriginal: FC<IProps> = (props) => {
  const {
    handlePress,
    width,
    title,
    loading,
    customStyle,
    icon,
    iconRight,
    useViewComponent,
    height,
    disabled
  } = props;
  return (
      <Button
        loading={loading}
        onPress={handlePress}
        title={title}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: COLOR_LINEAR_DEFAULT,
          start: { x: 0.5, y: 1 },
          end: { x: 1, y: 1 },
        }}
        buttonStyle={[styles.buttonStyle, { width, height }, customStyle]}
        titleStyle={styles.titleStyle}
        iconRight={iconRight}
        icon={icon}
        disabled={disabled}
        {...props}
      />
  );
};

ButtonOriginal.defaultProps = {
  title: '',
  width: wp('90%'),
  loading: false,
  height: hp('6%'),
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 25,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleStyle: {
    color: 'white',
    fontWeight: '500',
    marginRight: 3,
  },
});

export default ButtonOriginal;
