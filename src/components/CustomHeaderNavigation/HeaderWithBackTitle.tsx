import React, { FC } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { wp, hp } from 'components/Utils/responsive.style';
import { COLOR_TEXT_DEFAULT } from 'styles/global.style';

const checkISO = Platform.OS === 'ios';
interface IProps {
  title?: string;
  showBack?: boolean;
  handlePress?: any;
  navigation?: any;
  textHeaderStyle?: any;
  containerStyle?: any;
  rightComponent?: any;
}
const HeaderWithBackTitle : FC<IProps> = (props) => {
  const {
    title,
    showBack,
    handlePress,
    navigation,
    textHeaderStyle,
    containerStyle,
    rightComponent,
  } = props;

  const handleClick = () => {
    handlePress ? handlePress() : navigation.goBack();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={{ width: wp('10%') }}>
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

      <View style={{ width: wp('10%'), alignItems: 'flex-end' }}>
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
    paddingBottom: hp('2%'),
    paddingTop: hp('4.5%'),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp('4%'),
  },
  textHeader: {
    flex: 1,
    fontWeight: '700',
    fontSize: wp('5.5%'),
    color: COLOR_TEXT_DEFAULT,
    marginLeft: 16,
    textAlign: 'center',
  },
});

export default HeaderWithBackTitle;
