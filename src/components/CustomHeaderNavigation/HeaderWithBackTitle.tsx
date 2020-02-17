import React, { FC } from 'react';
import {View, Text, StyleSheet, Platform, StatusBar} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { wp, hp } from 'components/Utils/responsive.style';
import { COLOR_TEXT_DEFAULT } from 'styles/global.style';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';

const checkISO = Platform.OS === 'ios';
interface IProps extends NavigationInjectedProps{
  title?: string;
  showBack?: boolean;
  handlePress?: any;
  textHeaderStyle?: any;
  containerStyle?: any;
  rightComponent?: any;
}
const HeaderWithBackTitle : FC<IProps> = (props) => {
  const {
    title,
    showBack,
    handlePress,
    textHeaderStyle,
    containerStyle,
    rightComponent,
    navigation,
  } = props;

  const handleClick = () => {
    handlePress ? handlePress() : navigation.goBack();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={{ width: wp('10%')}}>
        {showBack && (
          <IonIcons
            name={checkISO ? 'ios-arrow-back' : 'md-arrow-back'}
            size={wp('6%')}
            onPress={handleClick}
            color={COLOR_TEXT_DEFAULT}
          />
        )}
      </View>

      <Text style={[styles.textHeader, textHeaderStyle]}>{title}</Text>

      <View style={{ alignItems: 'flex-end' }}>
        {rightComponent && rightComponent}
      </View>
    </View>
  );
};

HeaderWithBackTitle.defaultProps = {
  showBack: true,
  title: '',
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: StatusBar.currentHeight,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp('5%'),
    height: hp('8%'),
    backgroundColor: '#fff'
  },
  textHeader: {
    flex: 1,
    fontWeight: '700',
    fontSize: wp('5.5%'),
    color: COLOR_TEXT_DEFAULT,
    textAlign: 'center',
  },
});

export default withNavigation(HeaderWithBackTitle);
